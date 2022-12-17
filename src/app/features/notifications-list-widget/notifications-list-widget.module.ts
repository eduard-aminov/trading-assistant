import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListWidgetComponent } from './notifications-list-widget.component';
import { NotificationsListWidgetStoreService } from './services/notifications-list-widget.store.service';
import { NotificationsListWidgetFacadeService } from './services/notifications-list-widget.facade.service';
import { NotificationsListWidgetApiService } from './services/notifications-list-widget.api.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'Database',
  version: 1,
  objectStoresMeta: [{
    store: 'deals',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    NotificationsListWidgetComponent
  ],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig),
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
