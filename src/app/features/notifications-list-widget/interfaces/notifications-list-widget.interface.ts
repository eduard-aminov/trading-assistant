import { NotificationsListWidgetNotification } from '../models/notifications-list-widget.model';
import { MarketListWidgetItem } from '../../market-list-widget/models/market-list-widget.model';

export interface NotificationsListWidgetState {
  markets: MarketListWidgetItem[];
  notifications: NotificationsListWidgetNotification[];
  isNotificationsLoading: boolean;
  isNotificationsEmpty: boolean;
  extremeVolumeTriggerTotalSum: number;
}
