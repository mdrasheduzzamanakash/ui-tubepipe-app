import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentViewComponent } from './content-view/content-view.component';

@NgModule({
  declarations: [ContentViewComponent],
  imports: [CommonModule],
  exports: [ContentViewComponent],
})
export class MContentViewModule {}
