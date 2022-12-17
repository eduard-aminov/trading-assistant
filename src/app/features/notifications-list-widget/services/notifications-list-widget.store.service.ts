import { Injectable } from '@angular/core';
import { Store } from '../../../core/abstract/store.abstract';
import { NotificationsListWidgetState } from '../interfaces/notifications-list-widget.interface';
import { NotificationsListWidgetNotification } from '../models/notifications-list-widget.model';
import { MarketListWidgetItem } from '../../market-list-widget/models/market-list-widget.model';

const initialState: NotificationsListWidgetState = {
  markets: [],
  notifications: [],
  isNotificationsLoading: true,
  isNotificationsEmpty: true,
  extremeVolumeTriggerTotalSum: 0,
};

@Injectable()
export class NotificationsListWidgetStoreService extends Store<NotificationsListWidgetState> {
  constructor() {
    super(initialState);
  }

  public setMarkets(markets: MarketListWidgetItem[]): void {
    this.setState({markets});
  }

  public addMarket(market: MarketListWidgetItem): void {
    this.setState({markets: [...this.stateSnapshot.markets, market]});
  }

  public updateMarket(market: MarketListWidgetItem): void {
    const markets = this.stateSnapshot.markets.map(item => {
      if (item.symbol === market.symbol) {
        return market;
      }
      return item;
    });
    this.setMarkets(markets);
  }

  public setNotifications(notifications: NotificationsListWidgetNotification[]): void {
    this.setState({notifications});
  }

  public addNotification(notification: NotificationsListWidgetNotification): void {
    this.setState({notifications: [...this.stateSnapshot.notifications, notification]});
  }
}
