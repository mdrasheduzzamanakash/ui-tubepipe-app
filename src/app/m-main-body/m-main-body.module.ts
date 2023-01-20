import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MPipeCartModule } from '../m-pipe-cart/m-pipe-cart.module';
import { MainBodyComponent } from './main-body/main-body.component';

@NgModule({
  declarations: [MainBodyComponent],
  imports: [
    CommonModule,
    MPipeCartModule
  ],
  exports: [MainBodyComponent],
})
export class MMainBodyModule { }
