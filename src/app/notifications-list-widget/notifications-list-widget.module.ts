import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListWidgetComponent } from './notifications-list-widget.component';
import { NotificationsListWidgetStoreService } from './services/notifications-list-widget.store.service';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { NotificationsListWidgetApiService } from './services/notifications-list-widget.api.service';
import { NotificationsListWidgetWebsocketService } from './services/notifications-list-widget.websocket.service';

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
  ],
  exports: [
    NotificationsListWidgetComponent
  ]
})
export class NotificationsListWidgetModule {}
