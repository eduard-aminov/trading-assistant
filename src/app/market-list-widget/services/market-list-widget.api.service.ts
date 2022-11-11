import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';

@Injectable()
export class MarketListWidgetApiService {

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
  ) {}
}
