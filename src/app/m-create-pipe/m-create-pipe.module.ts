import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePipeComponent } from './create-pipe/create-pipe.component';



@NgModule({
  declarations: [
    CreatePipeComponent
  ],
  imports: [
    CommonModule
  ],exports: [
    CreatePipeComponent
  ]
})
export class MCreatePipeModule { }
