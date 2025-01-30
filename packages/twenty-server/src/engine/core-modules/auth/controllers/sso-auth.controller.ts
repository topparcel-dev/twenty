/* @license Enterprise */

import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { generateServiceProviderMetadata } from '@node-saml/node-saml';
import { Response } from 'express';
import { Repository } from 'typeorm';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import { AuthRestApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-rest-api-exception.filter';
import { OIDCAuthGuard } from 'src/engine/core-modules/auth/guards/oidc-auth.guard';
import { SAMLAuthGuard } from 'src/engine/core-modules/auth/guards/saml-auth.guard';
import { EnterpriseFeaturesEnabledGuard } from 'src/engine/core-modules/auth/guards/enterprise-features-enabled.guard';
import { AuthService } from 'src/engine/core-modules/auth/services/auth.service';
import { LoginTokenService } from 'src/engine/core-modules/auth/token/services/login-token.service';
import { SSOService } from 'src/engine/core-modules/sso/services/sso.service';
import {
  IdentityProviderType,
  WorkspaceSSOIdentityProvider,
} from 'src/engine/core-modules/sso/workspace-sso-identity-provider.entity';
import { User } from 'src/engine/core-modules/user/user.entity';
import { AuthOAuthExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-oauth-exception.filter';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { GuardRedirectService } from 'src/engine/core-modules/guard-redirect/services/guard-redirect.service';

@Controller('auth')
export class SSOAuthController {
  constructor(
    private readonly loginTokenService: LoginTokenService,
    private readonly authService: AuthService,
    private readonly guardRedirectService: GuardRedirectService,
    private readonly environmentService: EnvironmentService,
    private readonly sSOService: SSOService,
    @InjectRepository(User, 'core')
    private readonly userRepository: Repository<User>,
    @InjectRepository(WorkspaceSSOIdentityProvider, 'core')
    private readonly workspaceSSOIdentityProviderRepository: Repository<WorkspaceSSOIdentityProvider>,
  ) {}

  @Get('saml/metadata/:identityProviderId')
  @UseGuards(EnterpriseFeaturesEnabledGuard)
  @UseFilters(AuthRestApiExceptionFilter)
  async generateMetadata(@Req() req: any): Promise<string | void> {
    return generateServiceProviderMetadata({
      wantAssertionsSigned: false,
      issuer: this.sSOService.buildIssuerURL({
        id: req.params.identityProviderId,
        type: IdentityProviderType.SAML,
      }),
      callbackUrl: this.sSOService.buildCallbackUrl({
        id: req.params.identityProviderId,
        type: IdentityProviderType.SAML,
      }),
    });
  }

  @Get('oidc/login/:identityProviderId')
  @UseGuards(EnterpriseFeaturesEnabledGuard, OIDCAuthGuard)
  @UseFilters(AuthRestApiExceptionFilter)
  async oidcAuth() {
    // As this method is protected by OIDC Auth guard, it will trigger OIDC SSO flow
    return;
  }

  @Get('saml/login/:identityProviderId')
  @UseGuards(EnterpriseFeaturesEnabledGuard, SAMLAuthGuard)
  @UseFilters(AuthRestApiExceptionFilter)
  async samlAuth() {
    // As this method is protected by SAML Auth guard, it will trigger SAML SSO flow
    return;
  }

  @Get('oidc/callback')
  @UseGuards(EnterpriseFeaturesEnabledGuard, OIDCAuthGuard)
  @UseFilters(AuthOAuthExceptionFilter)
  async oidcAuthCallback(@Req() req: any, @Res() res: Response) {
    return await this.authCallback(req, res);
  }

  @Post('saml/callback/:identityProviderId')
  @UseGuards(EnterpriseFeaturesEnabledGuard, SAMLAuthGuard)
  @UseFilters(AuthOAuthExceptionFilter)
  async samlAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      return await this.authCallback(req, res);
    } catch (err) {
      return new AuthException(
        err.message ?? 'Access denied',
        AuthExceptionCode.OAUTH_ACCESS_DENIED,
      );
    }
  }

  private async authCallback({ user }: any, res: Response) {
    const workspaceIdentityProvider =
      await this.findWorkspaceIdentityProviderByIdentityProviderId(
        user.identityProviderId,
      );

    try {
      if (!workspaceIdentityProvider) {
        throw new AuthException(
          'Identity provider not found',
          AuthExceptionCode.OAUTH_ACCESS_DENIED,
        );
      }

      if (!user.user.email) {
        throw new AuthException(
          'Email not found from identity provider.',
          AuthExceptionCode.OAUTH_ACCESS_DENIED,
        );
      }

      const { loginToken, identityProvider } = await this.generateLoginToken(
        user.user,
        workspaceIdentityProvider,
      );

      return res.redirect(
        this.authService.computeRedirectURI({
          loginToken: loginToken.token,
          subdomain: identityProvider.workspace.subdomain,
        }),
      );
    } catch (err) {
      return res.redirect(
        this.guardRedirectService.getRedirectErrorUrlAndCaptureExceptions(
          err,
          workspaceIdentityProvider?.workspace ?? {
            subdomain: this.environmentService.get('DEFAULT_SUBDOMAIN'),
          },
        ),
      );
    }
  }

  private async findWorkspaceIdentityProviderByIdentityProviderId(
    identityProviderId: string,
  ) {
    return await this.workspaceSSOIdentityProviderRepository.findOne({
      where: { id: identityProviderId },
      relations: ['workspace'],
    });
  }

  private async generateLoginToken(
    payload: { email: string } & Record<string, string>,
    identityProvider: WorkspaceSSOIdentityProvider,
  ) {
    if (!identityProvider) {
      throw new AuthException(
        'Identity provider not found',
        AuthExceptionCode.INVALID_DATA,
      );
    }

    const invitation =
      payload.email && identityProvider.workspace
        ? await this.authService.findInvitationForSignInUp({
            currentWorkspace: identityProvider.workspace,
            email: payload.email,
          })
        : undefined;

    const existingUser = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    const { userData } = this.authService.formatUserDataPayload(
      payload,
      existingUser,
    );

    await this.authService.checkAccessForSignIn({
      userData,
      invitation,
      workspace: identityProvider.workspace,
    });

    const { workspace, user } = await this.authService.signInUp({
      userData,
      workspace: identityProvider.workspace,
      invitation,
      authParams: {
        provider: 'sso',
      },
    });

    return {
      identityProvider,
      loginToken: await this.loginTokenService.generateLoginToken(
        user.email,
        workspace.id,
      ),
    };
  }
}
