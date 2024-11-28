import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { Repository } from 'typeorm';

import {
  BillingException,
  BillingExceptionCode,
} from 'src/engine/core-modules/billing/billing.exception';
import { BillingEntitlement } from 'src/engine/core-modules/billing/entities/billing-entitlement.entity';
import { BillingSubscriptionItem } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { BillingSubscription } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { BillingEntitlementKey } from 'src/engine/core-modules/billing/enums/billing-entitlement-key.enum';
import { SubscriptionStatus } from 'src/engine/core-modules/billing/enums/billing-subscription-status.enum';
import {
  Workspace,
  WorkspaceActivationStatus,
} from 'src/engine/core-modules/workspace/workspace.entity';

@Injectable()
export class BillingWebhookService {
  protected readonly logger = new Logger(BillingWebhookService.name);
  constructor(
    @InjectRepository(BillingSubscription, 'core')
    private readonly billingSubscriptionRepository: Repository<BillingSubscription>,
    @InjectRepository(BillingEntitlement, 'core')
    private readonly billingEntitlementRepository: Repository<BillingEntitlement>,
    @InjectRepository(BillingSubscriptionItem, 'core')
    private readonly billingSubscriptionItemRepository: Repository<BillingSubscriptionItem>,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
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

    await this.billingSubscriptionRepository.upsert(
      {
        workspaceId,
        stripeCustomerId: data.object.customer as string,
        stripeSubscriptionId: data.object.id,
        status: data.object.status as SubscriptionStatus,
        interval: data.object.items.data[0].plan.interval,
      },
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
      data.object.items.data.map((item) => {
        return {
          billingSubscriptionId: billingSubscription.id,
          stripeProductId: item.price.product as string,
          stripePriceId: item.price.id,
          stripeSubscriptionItemId: item.id,
          quantity: item.quantity,
        };
      }),
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
  }

  async processCustomerActiveEntitlement(
    data: Stripe.EntitlementsActiveEntitlementSummaryUpdatedEvent.Data,
  ) {
    const billingSubscription =
      await this.billingSubscriptionRepository.findOne({
        where: { stripeCustomerId: data.object.customer },
      });

    if (!billingSubscription) {
      throw new BillingException(
        'Billing customer not found',
        BillingExceptionCode.BILLING_CUSTOMER_NOT_FOUND,
      );
    }

    const workspaceId = billingSubscription.workspaceId;
    const stripeCustomerId = data.object.customer;

    const activeEntitlementsKeys = data.object.entitlements.data.map(
      (entitlement) => entitlement.lookup_key,
    );

    await this.billingEntitlementRepository.upsert(
      Object.values(BillingEntitlementKey).map((key) => {
        return {
          workspaceId,
          key,
          value: activeEntitlementsKeys.includes(key),
          stripeCustomerId,
        };
      }),
      {
        conflictPaths: ['workspaceId', 'key'],
        skipUpdateIfNoValuesChanged: true,
      },
    );
  }
}
