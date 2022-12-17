import { Inject, Injectable } from '@angular/core';
import { MarketRobotStoreService } from './market-robot.store.service';
import { TradingViewApiService } from '../../../core/services/trading-view-api.service';

@Injectable()
export class MarketRobotApiService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(MarketRobotStoreService) private store: MarketRobotStoreService,
  ) {}
}
