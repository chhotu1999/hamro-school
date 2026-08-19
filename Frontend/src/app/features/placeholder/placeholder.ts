import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedComponent } from '../../shared/common-shared';
import { IconName } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-placeholder',
  imports: [...SharedComponent],
  templateUrl: './placeholder.html',
  styleUrl: './placeholder.less',
})
export class Placeholder {
  private route = inject(ActivatedRoute);

  title = this.route.snapshot.data['title'] as string;
  icon = (this.route.snapshot.data['icon'] as IconName) ?? 'settings';
}
