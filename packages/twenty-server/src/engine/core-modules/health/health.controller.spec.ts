import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthCacheService } from 'src/engine/core-modules/health/health-cache.service';
import { HealthController } from 'src/engine/core-modules/health/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        HealthController,
        {
          provide: HealthCheckService,
          useValue: {},
        },
        {
          provide: HttpHealthIndicator,
          useValue: {},
        },
        {
          provide: HealthCacheService,
          useValue: {},
        },
      ],
    }).compile();

    healthController = testingModule.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });
});
