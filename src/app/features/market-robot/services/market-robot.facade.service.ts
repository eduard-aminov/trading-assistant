import { Inject, Injectable } from '@angular/core';
import { MarketRobotStoreService } from './market-robot.store.service';
import { MarketRobotApiService } from './market-robot.api.service';

@Injectable()
export class MarketRobotFacadeService {
  constructor(
    @Inject(MarketRobotStoreService) private store: MarketRobotStoreService,
    @Inject(MarketRobotApiService) private api: MarketRobotApiService,
  ) {}
}

