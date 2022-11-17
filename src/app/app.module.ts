import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketListWidgetModule } from './market-list-widget/market-list-widget.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsListWidgetModule } from './notifications-list-widget/notifications-list-widget.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationsListWidgetModule,
    MarketListWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
