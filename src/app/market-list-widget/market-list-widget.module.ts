import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketListWidgetComponent } from './market-list-widget.component';
import { MarketListWidgetStoreService } from './services/market-list-widget.store.service';
import { MarketListWidgetFacadeService } from './services/market-list-widget.facade.service';
import { MarketListWidgetApiService } from './services/market-list-widget.api.service';
import { MarketListWidgetWebsocketService } from './services/market-list-widget.websocket.service';

@NgModule({
  declarations: [
    MarketListWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MarketListWidgetApiService,
    MarketListWidgetWebsocketService,
    MarketListWidgetStoreService,
    MarketListWidgetFacadeService,
  ],
  exports: [
    MarketListWidgetComponent
  ]
})
export class MarketListWidgetModule {}
