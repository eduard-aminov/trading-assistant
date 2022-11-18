import { Inject, Injectable } from '@angular/core';
import { DashboardStoreService } from './dashboard.store.service';
import { TradingViewApiService } from '../../../core/services/trading-view-api.service';

@Injectable()
export class DashboardApiService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(DashboardStoreService) private store: DashboardStoreService,
  ) {}
}
