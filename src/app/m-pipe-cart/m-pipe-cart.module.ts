import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeCartComponent } from './pipe-cart/pipe-cart.component';

@NgModule({
  declarations: [PipeCartComponent],
  imports: [CommonModule],
  exports: [PipeCartComponent],
})
export class MPipeCartModule {}
