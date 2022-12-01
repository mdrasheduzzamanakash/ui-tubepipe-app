import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MContentViewModule } from '../m-content-view/m-content-view.module';
import { MPipeHolderModule } from '../m-pipe-holder/m-pipe-holder.module';
import { MProgressPanelModule } from '../m-progress-panel/m-progress-panel.module';
import { MainBodyComponent } from './main-body/main-body.component';

@NgModule({
  declarations: [MainBodyComponent],
  imports: [
    CommonModule,
    MContentViewModule,
    MProgressPanelModule,
    MPipeHolderModule,
  ],
  exports: [MainBodyComponent],
})
export class MMainBodyModule {}
