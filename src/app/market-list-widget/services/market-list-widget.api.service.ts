import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { forkJoin, Observable } from 'rxjs';
import { WIDGET_NAME_TOKEN } from '../../core/tokens/widget-name.token';

@Injectable()
export class MarketListWidgetApiService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(WIDGET_NAME_TOKEN) private widgetName: string,
  ) {}

  public run(): Observable<void> {
    return this.api.quoteCreateSession(this.widgetName);
  }

  public loadSymbolData(symbol: string, fields: string[]): Observable<void[]> {
    return forkJoin([
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteAddSymbols(this.widgetName, symbol),
    ]);
  }
}
