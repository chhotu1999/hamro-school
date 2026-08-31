import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { IconModule } from '../icon/icon.module';
import { StatCardComponent } from './stat-card.component';

@NgModule({
  declarations: [StatCardComponent],
  imports: [CardModule, IconModule],
  exports: [StatCardComponent],
})
export class StatCardModule {}
