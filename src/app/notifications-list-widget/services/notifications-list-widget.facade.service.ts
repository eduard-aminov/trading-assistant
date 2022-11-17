import { Inject, Injectable } from '@angular/core';
import { NotificationsListWidgetStoreService } from './notifications-list-widget.store.service';
import { NotificationsListWidgetApiService } from './notifications-list-widget.api.service';
import { combineLatest, EMPTY, map, Observable, switchMap } from 'rxjs';
import { NotificationsListWidgetWebsocketService } from './notifications-list-widget.websocket.service';

@Injectable()
export class NotificationsListWidgetFacadeService {

  public readonly notifications$ = this.store.select('notifications');
  public readonly isNotificationsEmpty$ = this.store.select('isNotificationsEmpty');

  constructor(
    @Inject(NotificationsListWidgetStoreService) private store: NotificationsListWidgetStoreService,
    @Inject(NotificationsListWidgetApiService) private api: NotificationsListWidgetApiService,
    @Inject(NotificationsListWidgetWebsocketService) private webSocket: NotificationsListWidgetWebsocketService,
  ) {
  }

  public runWebsocketServices(): Observable<void> {
    return combineLatest([
      this.webSocket.run(),
      this.api.run(),
    ]).pipe(
      switchMap(() => EMPTY),
    );
  }


  public loadMarkets(symbols: string[]): Observable<boolean> {
    return this.api.loadSymbolsData(symbols).pipe(
      map(() => true)
    );
  }
}
