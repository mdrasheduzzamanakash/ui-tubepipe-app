import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MPipeCartModule } from '../m-pipe-cart/m-pipe-cart.module';
import { PipeHolderComponent } from './pipe-holder/pipe-holder.component';

@NgModule({
  declarations: [PipeHolderComponent],
  imports: [CommonModule, MPipeCartModule],
  exports: [PipeHolderComponent],
})
export class MPipeHolderModule {}
