import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconModule } from '../../shared/controls/icon/icon.module';
import { AppLayoutComponent } from './app-layout.component';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [CommonModule, MatSlideToggleModule, IconModule],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
