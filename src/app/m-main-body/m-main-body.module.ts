import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainBodyComponent } from './main-body/main-body.component';

@NgModule({
  declarations: [MainBodyComponent],
  imports: [CommonModule],
  exports: [MainBodyComponent],
})
export class MMainBodyModule {}
