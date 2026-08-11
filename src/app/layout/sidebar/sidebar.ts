import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon, IconName } from '../../shared/ui/icon/icon';

interface NavItem {
  label: string;
  icon: IconName;
  link?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
})
export class Sidebar {
  private document = inject(DOCUMENT);

  collapsed = signal(false);
  darkMode = signal(false);

  railIcons: IconName[] = ['grid', 'users', 'book', 'wallet'];

  sections: NavSection[] = [
    {
      title: 'Academics',
      items: [
        { label: 'Dashboard', icon: 'grid', link: '/' },
        { label: 'Students', icon: 'users', link: '/students' },
        { label: 'Teachers', icon: 'book' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { label: 'Fee Collection', icon: 'wallet' },
        { label: 'Reports', icon: 'chart-bar' },
      ],
    },
  ];

  toggleCollapsed(): void {
    this.collapsed.update((v) => !v);
  }

  toggleDarkMode(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    this.document.documentElement.classList.toggle('dark', next);
  }
}
