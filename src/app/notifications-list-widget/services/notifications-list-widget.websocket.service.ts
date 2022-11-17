import { Inject, Injectable } from '@angular/core';
import { TradingViewApiService } from '../../core/services/trading-view-api.service';
import { NotificationsListWidgetStoreService } from './notifications-list-widget.store.service';
import { map, Observable, tap } from 'rxjs';
import { match } from '../../core/utils/pattern-matching';
import { TradingViewWebSocketMessage } from '../../core/models/trading-view-web-socket-message';
import { TradingViewWebSocketMessagePacketType } from '../../core/enums/trading-view-packet-type';
import {
  TradingViewWebSocketCriticalErrorPacketData,
  TradingViewWebSocketQsdPacketData
} from '../../core/interfaces/trading-view-web-socket-packet.interface';
import { NotificationsListWidgetItem } from '../models/notifications-list-widget.model';
import { TelegramBotApiService } from '../../core/services/telegram-bot-api.service';

@Injectable()
export class NotificationsListWidgetWebsocketService {

  private widgetName = 'NotificationsListWidget';

  constructor(
    @Inject(TradingViewApiService) private api: TradingViewApiService,
    @Inject(TelegramBotApiService) private telegramBotApi: TelegramBotApiService,
    @Inject(NotificationsListWidgetStoreService) private store: NotificationsListWidgetStoreService,
  ) {}

  public run(): Observable<boolean> {
    return this.api.messages$.pipe(
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
    const notification = new NotificationsListWidgetItem(data);
    if (notification.marketPrice) {
      this.store.addNotification(notification);
      this.store.setState({isNotificationsEmpty: false});
    }
  }

  private onCriticalError(message: TradingViewWebSocketMessage): void {
    const data = message.data as TradingViewWebSocketCriticalErrorPacketData;
    console.error(`${data[0]} - ${data[1]}`);
  }
}
