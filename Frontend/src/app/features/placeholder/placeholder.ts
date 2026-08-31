import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedControls } from '../../shared/common-shared';
import { IconName } from '../../shared/controls/icon/icon.component';

@Component({
  selector: 'app-placeholder',
  imports: [...SharedControls],
  templateUrl: './placeholder.html',
  styleUrl: './placeholder.less',
})
export class Placeholder {
  private route = inject(ActivatedRoute);

  title = this.route.snapshot.data['title'] as string;
  icon = (this.route.snapshot.data['icon'] as IconName) ?? 'settings';
}
