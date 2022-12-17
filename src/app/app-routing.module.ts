import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {
    path: 'dashboard',
    loadChildren: () => import('./features/market-robot/market-robot.module').then(m => m.MarketRobotModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
