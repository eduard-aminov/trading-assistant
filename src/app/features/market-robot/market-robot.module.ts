import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketRobotDashboardComponent } from './components/market-robot-dashboard/market-robot-dashboard.component';
import { MarketRobotStoreService } from './services/market-robot.store.service';
import { MarketRobotFacadeService } from './services/market-robot.facade.service';
import { MarketRobotApiService } from './services/market-robot.api.service';
import { MarketRobotWidgetComponent } from './components/market-robot-widget/market-robot-widget.component';
import { MarketRobotRoutingModule } from './market-robot-routing.module';

@NgModule({
  declarations: [
    MarketRobotDashboardComponent,
    MarketRobotWidgetComponent,
  ],
  imports: [
    CommonModule,
    MarketRobotRoutingModule,
  ],
  providers: [
    MarketRobotApiService,
    MarketRobotStoreService,
    MarketRobotFacadeService,
  ],
  exports: [
    MarketRobotDashboardComponent
  ]
})
export class MarketRobotModule {}
