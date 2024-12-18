import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { Repository } from 'typeorm';

import { BillingCustomer } from 'src/engine/core-modules/billing/entities/billing-customer.entity';
import { BillingSubscriptionItem } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { BillingSubscription } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { SubscriptionStatus } from 'src/engine/core-modules/billing/enums/billing-subscription-status.enum';
import { StripeService } from 'src/engine/core-modules/billing/stripe/stripe.service';
import { transformStripeSubscriptionEventToCustomerRepositoryData } from 'src/engine/core-modules/billing/utils/transform-stripe-subscription-event-to-customer-repository-data.util';
import { transformStripeSubscriptionEventToSubscriptionItemRepositoryData } from 'src/engine/core-modules/billing/utils/transform-stripe-subscription-event-to-subscription-item-repository-data.util';
import { transformStripeSubscriptionEventToSubscriptionRepositoryData } from 'src/engine/core-modules/billing/utils/transform-stripe-subscription-event-to-subscription-repository-data.util';
import {
  Workspace,
  WorkspaceActivationStatus,
} from 'src/engine/core-modules/workspace/workspace.entity';
@Injectable()
export class BillingWebhookSubscriptionService {
  protected readonly logger = new Logger(
    BillingWebhookSubscriptionService.name,
  );
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(BillingSubscription, 'core')
    private readonly billingSubscriptionRepository: Repository<BillingSubscription>,
    @InjectRepository(BillingSubscriptionItem, 'core')
    private readonly billingSubscriptionItemRepository: Repository<BillingSubscriptionItem>,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(BillingCustomer, 'core')
    private readonly billingCustomerRepository: Repository<BillingCustomer>,
  ) {}

  async processStripeEvent(
    workspaceId: string,
    data:
      | Stripe.CustomerSubscriptionUpdatedEvent.Data
      | Stripe.CustomerSubscriptionCreatedEvent.Data
      | Stripe.CustomerSubscriptionDeletedEvent.Data,
  ) {
    const workspace = await this.workspaceRepository.findOne({
      where: { id: workspaceId },
    });

    if (!workspace) {
      return;
    }

    await this.billingCustomerRepository.upsert(
      transformStripeSubscriptionEventToCustomerRepositoryData(
        workspaceId,
        data,
      ),
      {
        conflictPaths: ['workspaceId', 'stripeCustomerId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    await this.billingSubscriptionRepository.upsert(
      transformStripeSubscriptionEventToSubscriptionRepositoryData(
        workspaceId,
        data,
      ),
      {
        conflictPaths: ['stripeSubscriptionId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    const billingSubscription =
      await this.billingSubscriptionRepository.findOneOrFail({
        where: { stripeSubscriptionId: data.object.id },
      });

    await this.billingSubscriptionItemRepository.upsert(
      transformStripeSubscriptionEventToSubscriptionItemRepositoryData(
        billingSubscription.id,
        data,
      ),
      {
        conflictPaths: ['billingSubscriptionId', 'stripeProductId'],
        skipUpdateIfNoValuesChanged: true,
      },
    );

    if (
      data.object.status === SubscriptionStatus.Canceled ||
      data.object.status === SubscriptionStatus.Unpaid
    ) {
      await this.workspaceRepository.update(workspaceId, {
        activationStatus: WorkspaceActivationStatus.INACTIVE,
      });
    }

    if (
      (data.object.status === SubscriptionStatus.Active ||
        data.object.status === SubscriptionStatus.Trialing ||
        data.object.status === SubscriptionStatus.PastDue) &&
      workspace.activationStatus == WorkspaceActivationStatus.INACTIVE
    ) {
      await this.workspaceRepository.update(workspaceId, {
        activationStatus: WorkspaceActivationStatus.ACTIVE,
      });
    }

    await this.stripeService.updateCustomerMetadataWorkspaceId(
      String(data.object.customer),
      workspaceId,
    );
  }
}
