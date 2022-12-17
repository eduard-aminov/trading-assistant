import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketRobotDashboardComponent } from './components/market-robot-dashboard/market-robot-dashboard.component';

const routes: Routes = [
  {path: '', component: MarketRobotDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRobotRoutingModule {}
