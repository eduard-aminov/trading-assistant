import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';

@Injectable()
export class MarketListWidgetWebsocketService {

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
  ) {}
}
