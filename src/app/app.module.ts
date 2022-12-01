import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MContentViewModule } from './m-content-view/m-content-view.module';
import { MFooterModule } from './m-footer/m-footer.module';
import { MMainBodyModule } from './m-main-body/m-main-body.module';
import { MNavbarModule } from './m-navbar/m-navbar.module';
import { MPipeCartModule } from './m-pipe-cart/m-pipe-cart.module';
import { MProgressPanelModule } from './m-progress-panel/m-progress-panel.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMainBodyModule,
    MNavbarModule,
    MFooterModule,
    MContentViewModule,
    MPipeCartModule,
    MProgressPanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
