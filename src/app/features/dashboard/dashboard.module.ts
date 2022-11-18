import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardStoreService } from './services/dashboard.store.service';
import { DashboardFacadeService } from './services/dashboard.facade.service';
import { DashboardApiService } from './services/dashboard.api.service';
import { MarketListWidgetModule } from '../market-list-widget/market-list-widget.module';
import { NotificationsListWidgetModule } from '../notifications-list-widget/notifications-list-widget.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MarketListWidgetModule,
    NotificationsListWidgetModule,
  ],
  providers: [
    DashboardApiService,
    DashboardStoreService,
    DashboardFacadeService,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
