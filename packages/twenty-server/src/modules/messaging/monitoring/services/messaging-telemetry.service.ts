import { Injectable } from '@nestjs/common';

import { AnalyticsService } from 'src/engine/core-modules/analytics/analytics.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

type MessagingTelemetryTrackInput = {
  eventName: string;
  workspaceId?: string;
  userId?: string;
  connectedAccountId?: string;
  messageChannelId?: string;
  message?: string;
};

@Injectable()
export class MessagingTelemetryService {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly twentyConfigService: TwentyConfigService,
  ) {}

  public async track({
    eventName,
    workspaceId,
    userId,
    connectedAccountId,
    messageChannelId,
    message,
  }: MessagingTelemetryTrackInput): Promise<void> {
    await this.analyticsService.create(
      {
        action: 'monitoring',
        payload: {
          eventName: `messaging.${eventName}`,
          workspaceId,
          userId,
          connectedAccountId,
          messageChannelId,
          message,
        },
      },
      userId,
      workspaceId,
    );
  }
}
