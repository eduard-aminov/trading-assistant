import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListWidgetComponent } from './notifications-list-widget.component';
import { NotificationsListWidgetStoreService } from './services/notifications-list-widget.store.service';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { NotificationsListWidgetApiService } from './services/notifications-list-widget.api.service';

@NgModule({
  declarations: [
    NotificationsListWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NotificationsListWidgetApiService,
    NotificationsListWidgetStoreService,
    NotificationsListWidgetFacadeService,
  ],
  exports: [
    NotificationsListWidgetComponent
  ]
})
export class NotificationsListWidgetModule {}
