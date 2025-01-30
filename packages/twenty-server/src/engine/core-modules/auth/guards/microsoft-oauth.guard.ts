import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GuardRedirectService } from 'src/engine/core-modules/guard-redirect/services/guard-redirect.service';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

@Injectable()
export class MicrosoftOAuthGuard extends AuthGuard('microsoft') {
  constructor(
    private readonly guardRedirectService: GuardRedirectService,
    private readonly environmentService: EnvironmentService,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
  ) {
    super({
      prompt: 'select_account',
    });
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let workspace: Workspace | null = null;

    try {
      if (
        request.query.workspaceId &&
        typeof request.query.workspaceId === 'string'
      ) {
        request.params.workspaceId = request.query.workspaceId;
        workspace = await this.workspaceRepository.findOneBy({
          id: request.query.workspaceId,
        });
      }

      const workspaceInviteHash = request.query.inviteHash;
      const workspacePersonalInviteToken = request.query.inviteToken;

      if (workspaceInviteHash && typeof workspaceInviteHash === 'string') {
        request.params.workspaceInviteHash = workspaceInviteHash;
      }

      if (
        workspacePersonalInviteToken &&
        typeof workspacePersonalInviteToken === 'string'
      ) {
        request.params.workspacePersonalInviteToken =
          workspacePersonalInviteToken;
      }

      if (
        request.query.billingCheckoutSessionState &&
        typeof request.query.billingCheckoutSessionState === 'string'
      ) {
        request.params.billingCheckoutSessionState =
          request.query.billingCheckoutSessionState;
      }

      return (await super.canActivate(context)) as boolean;
    } catch (err) {
      this.guardRedirectService.dispatchErrorFromGuard(
        context,
        err,
        workspace ?? {
          subdomain: this.environmentService.get('DEFAULT_SUBDOMAIN'),
        },
      );

      return false;
    }
  }
}
