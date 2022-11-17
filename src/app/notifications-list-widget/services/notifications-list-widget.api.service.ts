import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class NotificationsListWidgetApiService {

  private widgetName = 'NotificationsListWidget';

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
  ) {}

  public run(): Observable<void[]> {
    const fields = ['lp', 'chp', 'short_name', 'volume'];
    return forkJoin([
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteFastSymbols(this.widgetName),
    ]);
  }

  public loadSymbolsData(symbols: string[]): Observable<void> {
    return this.api.quoteAddSymbols(this.widgetName, symbols);
  }
}
