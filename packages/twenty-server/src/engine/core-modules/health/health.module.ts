import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from 'src/engine/core-modules/health/controllers/health.controller';
import { MetricsController } from 'src/engine/core-modules/health/controllers/metrics.controller';
import { AppHealthIndicator } from 'src/engine/core-modules/health/indicators/app.health';
import { RedisClientModule } from 'src/engine/core-modules/redis-client/redis-client.module';
import { ObjectMetadataModule } from 'src/engine/metadata-modules/object-metadata/object-metadata.module';
import { WorkspaceMigrationModule } from 'src/engine/metadata-modules/workspace-migration/workspace-migration.module';

import { HealthCacheService } from './health-cache.service';

import { ConnectedAccountHealth } from './indicators/connected-account.health';
import { DatabaseHealthIndicator } from './indicators/database.health';
import { RedisHealthIndicator } from './indicators/redis.health';
import { WorkerHealthIndicator } from './indicators/worker.health';
@Module({
  imports: [
    TerminusModule,
    RedisClientModule,
    ObjectMetadataModule,
    WorkspaceMigrationModule,
  ],
  controllers: [HealthController, MetricsController],
  providers: [
    HealthCacheService,
    DatabaseHealthIndicator,
    RedisHealthIndicator,
    WorkerHealthIndicator,
    ConnectedAccountHealth,
    AppHealthIndicator,
  ],
  exports: [
    HealthCacheService,
    DatabaseHealthIndicator,
    RedisHealthIndicator,
    WorkerHealthIndicator,
    ConnectedAccountHealth,
    AppHealthIndicator,
  ],
})
export class HealthModule {}
