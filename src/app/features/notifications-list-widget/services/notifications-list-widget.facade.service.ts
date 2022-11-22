import { Inject, Injectable } from '@angular/core';
import { NotificationsListWidgetStoreService } from './notifications-list-widget.store.service';
import { NotificationsListWidgetApiService } from './notifications-list-widget.api.service';
import { Observable, tap } from 'rxjs';
import { NotificationsListWidgetNotification } from '../models/notifications-list-widget.model';
import { removeFalsyPropValueFromObject } from '../../../core/utils/remove-falsy-props-from-object';
import { MarketListWidgetItem } from '../../market-list-widget/models/market-list-widget.model';
import { symbols } from '../../../core/mocks/symbols.mock';

@Injectable()
export class NotificationsListWidgetFacadeService {

  public readonly notifications$ = this.store.select('notifications');
  public readonly isNotificationsEmpty$ = this.store.select('isNotificationsEmpty');

  constructor(
    @Inject(NotificationsListWidgetStoreService) private store: NotificationsListWidgetStoreService,
    @Inject(NotificationsListWidgetApiService) private api: NotificationsListWidgetApiService,
  ) {
  }

  public openMarketsChangesConnection(): Observable<void> {
    return this.api.openMarketsChangesConnection(['lp', 'volume', 'currency_code']);
  }

  public closeMarketsChangesConnection(): Observable<void> {
    return this.api.closeMarketChangesConnection();
  }

  public subscribeMarketsChanges(): Observable<MarketListWidgetItem[]> {
    return this.api.subscribeMarketsChanges(symbols).pipe(
      tap(markets => {
        for (const market of markets) {
          this.updateOrAddMarket(market);
        }
      })
    );
  }

  private updateOrAddMarket(market: MarketListWidgetItem): void {
    const existMarket = this.store.stateSnapshot.markets.find(item => item.symbol === market.symbol);

    if (!existMarket) {
      this.store.addMarket(market);
      return;
    }

    this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(market)});
    this.addNotificationIfExtremeVolume(market, existMarket);
  }

  private addNotificationIfExtremeVolume(newMarket: MarketListWidgetItem, existMarket: MarketListWidgetItem): void {
    const volumeTotalSum = Math.floor((newMarket.volume! - existMarket.volume!) * existMarket.price!);
    if (volumeTotalSum > this.store.stateSnapshot.extremeVolumeTriggerTotalSum) {
      const direction = (existMarket.price! - newMarket.price!) > 0 ? 'Шорт' : (existMarket.price! - newMarket.price!) === 0 ? 'Неизвестно' : 'Лонг';
      this.store.updateMarket({...existMarket, ...removeFalsyPropValueFromObject(newMarket)});
      const notification = new NotificationsListWidgetNotification({...existMarket, volumeTotalSum, direction});
      this.store.addNotification(notification);
      this.store.setState({isNotificationsEmpty: false});
    }
  }
}
