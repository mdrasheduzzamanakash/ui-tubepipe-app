import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '../AppConfig/appconfig.serveice';
import { MPipeCartModule } from '../m-pipe-cart/m-pipe-cart.module';
import { MainBodyComponent } from './main-body/main-body.component';

@NgModule({
  declarations: [MainBodyComponent],
  imports: [
    CommonModule,
    MPipeCartModule, 
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    }
  ],
  exports: [MainBodyComponent],
})
export class MMainBodyModule { }
