import { Component, Input } from '@angular/core';

export type IconName =
  | 'grid'
  | 'users'
  | 'book'
  | 'wallet'
  | 'chart-bar'
  | 'settings'
  | 'logout'
  | 'chevron-left'
  | 'moon'
  | 'sun'
  | 'arrow-up-right'
  | 'arrow-down-right'
  | 'plus'
  | 'calendar'
  | 'search'
  | 'eye'
  | 'trash'
  | 'shield'
  | 'building'
  | 'bell'
  | 'user-plus'
  | 'swap'
  | 'check-square'
  | 'file-text'
  | 'id-card'
  | 'phone'
  | 'key'
  | 'briefcase'
  | 'award'
  | 'percent'
  | 'gift'
  | 'credit-card'
  | 'route'
  | 'home'
  | 'box'
  | 'mail'
  | 'activity'
  | 'alert-triangle'
  | 'truck'
  | 'close';

@Component({
  selector: 'ui-icon',
  standalone: false,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.less',
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 18;
}
