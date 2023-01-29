import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeDetailedComponent } from './pipe-detailed/pipe-detailed.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PipeDetailedComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
  ]
})
export class MPipeDetailedModule { }
