import { Injectable } from '@angular/core';
import { Store } from '../../core/abstract/store.abstract';
import { NotificationsListWidgetState } from '../interfaces/notifications-list-widget.interface';
import {
  NotificationsListWidgetMarket,
  NotificationsListWidgetNotification
} from '../models/notifications-list-widget.model';

const initialState: NotificationsListWidgetState = {
  markets: [],
  notifications: [],
  isNotificationsLoading: true,
  isNotificationsEmpty: true,
  extremeVolumeTriggerTotalSum: 5000000,
};

@Injectable()
export class NotificationsListWidgetStoreService extends Store<NotificationsListWidgetState> {
  constructor() {
    super(initialState);
  }

  public setMarkets(markets: NotificationsListWidgetMarket[]): void {
    this.setState({markets});
  }

  public addMarket(market: NotificationsListWidgetMarket): void {
    this.setState({markets: [...this.stateSnapshot.markets, market]});
  }

  public updateMarket(market: NotificationsListWidgetMarket): void {
    const markets = this.stateSnapshot.markets.map(item => {
      if (item.name === market.name) {
        return market;
      }
      return item;
    });
    this.setMarkets(markets);
  }

  public addNotification(notification: NotificationsListWidgetNotification): void {
    this.setState({notifications: [...this.stateSnapshot.notifications, notification]});
  }
}
