import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { NotificationsListWidgetStoreService } from './notifications-list-widget.store.service';
import { match } from '../../core/utils/pattern-matching';
import { TradingViewWebSocketMessagePacketType } from '../../core/enums/trading-view-packet-type';
import { TradingViewWebSocketMessage } from '../../core/models/trading-view-web-socket-message';
import {
  TradingViewWebSocketCriticalErrorPacketData,
  TradingViewWebSocketQsdPacketData
} from '../../core/interfaces/trading-view-web-socket-packet.interface';
import {
  NotificationsListWidgetMarket,
  NotificationsListWidgetNotification
} from '../models/notifications-list-widget.model';
import { removeFalsyPropValueFromObject } from '../../core/utils/remove-falsy-props-from-object';

@Injectable()
export class NotificationsListWidgetApiService {

  private widgetName = 'NotificationsListWidget';

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(NotificationsListWidgetStoreService) private store: NotificationsListWidgetStoreService,
  ) {}

  public loadSymbolsData(symbols: string[]): Observable<void> {
    return this.api.quoteAddSymbols(this.widgetName, symbols);
  }

  public run(): Observable<boolean> {
    const fields = ['lp', 'chp', 'short_name', 'volume', 'currency_code'];
    return combineLatest([
      this.api.messages$,
      this.api.quoteCreateSession(this.widgetName),
      this.api.quoteSetFields(this.widgetName, fields),
      this.api.quoteFastSymbols(this.widgetName),
    ]).pipe(
      map(value => value[0]),
      tap(messages => messages.forEach(message => {
        if (message.sessionId === this.widgetName) {
          match(message.type)
            .case(TradingViewWebSocketMessagePacketType.Qsd, () => this.onQsd(message))
            .case(TradingViewWebSocketMessagePacketType.CriticalError, () => this.onCriticalError(message))
            .default();
        }
      })),
      map(() => true)
    );
  }


  private onQsd(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketQsdPacketData;
    const market = new NotificationsListWidgetMarket(data);
    const existMarket = this.store.stateSnapshot.markets.find(item => item.name === market.name);

    if (!existMarket) {
      this.store.addMarket(market);
      return;
    }

    this.addNotificationIfExtremeVolume(market, existMarket);
  }

  private onCriticalError(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketCriticalErrorPacketData;
    console.error(`${data[0]} - ${data[1]}`);
  }

  private addNotificationIfExtremeVolume(newMarket: NotificationsListWidgetMarket, existMarket: NotificationsListWidgetMarket): void {
    const volumeTotalSum = Math.floor((newMarket.volume - existMarket.volume) * existMarket.price);
    if (volumeTotalSum > this.store.stateSnapshot.extremeVolumeTriggerTotalSum) {
      this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(newMarket)});
      const notification = new NotificationsListWidgetNotification({...existMarket, volumeTotalSum});
      this.store.addNotification(notification);
      this.store.setState({isNotificationsEmpty: false});
    }
  }
}
