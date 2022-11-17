import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { WIDGET_NAME_TOKEN } from '../../core/tokens/widget-name.token';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class NotificationsListWidgetApiService {
  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(WIDGET_NAME_TOKEN) private widgetName: string,
  ) {}

  public run(): Observable<void[]> {
    const fields = ['lp', 'chp', 'short_name', 'volume'];
    return forkJoin([
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteFastSymbols(this.widgetName),
    ]);
  }
}
