import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import { AuthRestApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-rest-api-exception.filter';
import { MicrosoftAPIsOauthExchangeCodeForTokenGuard } from 'src/engine/core-modules/auth/guards/microsoft-apis-oauth-exchange-code-for-token.guard';
import { MicrosoftAPIsOauthRequestCodeGuard } from 'src/engine/core-modules/auth/guards/mircosoft-apis-oauth-request-code.guard';
import { MicrosoftAPIsService } from 'src/engine/core-modules/auth/services/microsoft-apis.service';
import { TransientTokenService } from 'src/engine/core-modules/auth/token/services/transient-token.service';
import { MicrosoftAPIsRequest } from 'src/engine/core-modules/auth/types/microsoft-api-request.type';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { OnboardingService } from 'src/engine/core-modules/onboarding/onboarding.service';

@Controller('auth/microsoft-apis')
@UseFilters(AuthRestApiExceptionFilter)
export class MicrosoftAPIsAuthController {
  constructor(
    private readonly microsoftAPIsService: MicrosoftAPIsService,
    private readonly transientTokenService: TransientTokenService,
    private readonly environmentService: EnvironmentService,
    private readonly onboardingService: OnboardingService,
  ) {}

  @Get()
  @UseGuards(MicrosoftAPIsOauthRequestCodeGuard)
  async MicrosoftAuth() {
    // As this method is protected by Microsoft Auth guard, it will trigger Microsoft SSO flow
    return;
  }

  @Get('get-access-token')
  @UseGuards(MicrosoftAPIsOauthExchangeCodeForTokenGuard)
  async MicrosoftAuthGetAccessToken(
    @Req() req: MicrosoftAPIsRequest,
    @Res() res: Response,
  ) {
    const { user } = req;

    const {
      emails,
      accessToken,
      refreshToken,
      transientToken,
      redirectLocation,
      calendarVisibility,
      messageVisibility,
    } = user;

    const { workspaceMemberId, userId, workspaceId } =
      await this.transientTokenService.verifyTransientToken(transientToken);

    const demoWorkspaceIds = this.environmentService.get('DEMO_WORKSPACE_IDS');

    if (demoWorkspaceIds.includes(workspaceId)) {
      throw new AuthException(
        'Cannot connect Microsoft account to demo workspace',
        AuthExceptionCode.FORBIDDEN_EXCEPTION,
      );
    }

    if (!workspaceId) {
      throw new AuthException(
        'Workspace not found',
        AuthExceptionCode.WORKSPACE_NOT_FOUND,
      );
    }

    const handle = emails[0].value;

    await this.microsoftAPIsService.refreshMicrosoftRefreshToken({
      handle,
      workspaceMemberId: workspaceMemberId,
      workspaceId: workspaceId,
      accessToken,
      refreshToken,
      calendarVisibility,
      messageVisibility,
    });

    if (userId) {
      await this.onboardingService.setOnboardingConnectAccountPending({
        userId,
        workspaceId,
        value: false,
      });
    }

    return res.redirect(
      `${this.environmentService.get('FRONT_BASE_URL')}${
        redirectLocation || '/settings/accounts'
      }`,
    );
  }
}
