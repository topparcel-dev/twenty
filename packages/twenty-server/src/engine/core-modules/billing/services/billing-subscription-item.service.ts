import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JsonContains, Repository } from 'typeorm';

import {
  BillingException,
  BillingExceptionCode,
} from 'src/engine/core-modules/billing/billing.exception';
import { BillingPrice } from 'src/engine/core-modules/billing/entities/billing-price.entity';
import { BillingSubscriptionItem } from 'src/engine/core-modules/billing/entities/billing-subscription-item.entity';
import { BillingUsageType } from 'src/engine/core-modules/billing/enums/billing-usage-type.enum';

@Injectable()
export class BillingSubscriptionItemService {
  constructor(
    @InjectRepository(BillingSubscriptionItem, 'core')
    private readonly billingSubscriptionItemRepository: Repository<BillingSubscriptionItem>,
  ) {}

  async getMeteredSubscriptionItemDetails(subscriptionId: string) {
    const meteredSubscriptionItems =
      await this.billingSubscriptionItemRepository.find({
        where: {
          billingSubscriptionId: subscriptionId,
          billingProduct: {
            metadata: JsonContains({
              priceUsageBased: BillingUsageType.METERED,
            }),
          },
        },
        relations: ['billingProduct', 'billingProduct.billingPrices'],
      });

    return meteredSubscriptionItems.map((item) => {
      const price = this.findMatchingPrice(item);

      const stripeMeterId = price.stripeMeterId;

      if (!stripeMeterId) {
        throw new BillingException(
          `Stripe meter ID not found for product ${item.billingProduct.metadata.productKey}`,
          BillingExceptionCode.BILLING_METER_NOT_FOUND,
        );
      }

      return {
        stripeSubscriptionItemId: item.stripeSubscriptionItemId,
        productKey: item.billingProduct.metadata.productKey,
        stripeMeterId,
        includedFreeQuantity: this.getIncludedFreeQuantity(price),
        unitPriceCents: this.getUnitPrice(price),
      };
    });
  }

  private findMatchingPrice(item: BillingSubscriptionItem): BillingPrice {
    const matchingPrice = item.billingProduct.billingPrices.find(
      (price) => price.stripePriceId === item.stripePriceId,
    );

    if (!matchingPrice) {
      throw new BillingException(
        `Cannot find price for product ${item.stripeProductId}`,
        BillingExceptionCode.BILLING_PRICE_NOT_FOUND,
      );
    }

    return matchingPrice;
  }

  private getIncludedFreeQuantity(price: BillingPrice): number {
    return price.tiers?.find((tier) => tier.unit_amount === 0)?.up_to || 0;
  }

  private getUnitPrice(price: BillingPrice): number {
    return Number(
      price.tiers?.find((tier) => tier.up_to === null)?.unit_amount_decimal ||
        0,
    );
  }
}
