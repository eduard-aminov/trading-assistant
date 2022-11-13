import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { forkJoin, Observable } from 'rxjs';
import { WIDGET_NAME_TOKEN } from '../../core/tokens/widget-name.token';
import { quoteFields } from '../../core/mocks/quote-fields.mock';

@Injectable()
export class MarketListWidgetApiService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(WIDGET_NAME_TOKEN) private widgetName: string,
  ) {}

  public run(): Observable<void[]> {
    const fields = ['lp', 'chp', 'short_name'];
    return forkJoin([
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
    ]);
  }

  public loadSymbolsData(symbols: string[]): Observable<void> {
    return this.api.quoteAddSymbols(this.widgetName, symbols);
  }
}
