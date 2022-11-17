import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListWidgetComponent } from './notifications-list-widget.component';
import { NotificationsListWidgetStoreService } from './services/notifications-list-widget.store.service';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { NotificationsListWidgetApiService } from './services/notifications-list-widget.api.service';
import { NotificationsListWidgetWebsocketService } from './services/notifications-list-widget.websocket.service';
import { WIDGET_NAME_TOKEN } from '../core/tokens/widget-name.token';

@NgModule({
  declarations: [
    NotificationsListWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationsListWidgetApiService,
    NotificationsListWidgetWebsocketService,
    NotificationsListWidgetStoreService,
    NotificationsListWidgetFacadeService,
    {
      provide: WIDGET_NAME_TOKEN,
      useValue: 'NotificationsListWidget',
    }
  ],
  exports: [
    NotificationsListWidgetComponent
  ]
})
export class NotificationsListWidgetModule {}
