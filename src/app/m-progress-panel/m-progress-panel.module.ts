import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressPanelComponent } from './progress-panel/progress-panel.component';

@NgModule({
  declarations: [ProgressPanelComponent],
  imports: [CommonModule],
  exports: [ProgressPanelComponent],
})
export class MProgressPanelModule {}
