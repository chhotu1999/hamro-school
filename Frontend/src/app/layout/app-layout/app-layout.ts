import { Component, input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.less',
})
export class AppLayout {
  title = input.required<string>();
}
