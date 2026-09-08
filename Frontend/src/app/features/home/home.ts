import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconModule } from '../../shared/controls/icon/icon.module';
import { CardModule } from '../../shared/controls/card/card.module';
import { IconName } from '../../shared/controls/icon/icon.component';

interface HighlightCard {
  icon: IconName;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconModule, CardModule],
  templateUrl: './home.html',
  styleUrl: './home.less',
})
export class Home {
  readonly navLinks: NavLink[] = [
    { label: 'About', fragment: 'about' },
    { label: 'Programs', fragment: 'programs' },
    { label: 'Why Us', fragment: 'why-us' },
    { label: 'Contact', fragment: 'contact' },
  ];

  readonly stats: StatItem[] = [
    { value: '1,200+', label: 'Students enrolled' },
    { value: '85+', label: 'Qualified teachers' },
    { value: '98%', label: 'Pass rate' },
    { value: '25', label: 'Years of excellence' },
  ];

  readonly highlights: HighlightCard[] = [
    {
      icon: 'book',
      title: 'Modern Academics',
      description: 'A curriculum blending national standards with project-based, skill-focused learning.',
    },
    {
      icon: 'users',
      title: 'Experienced Faculty',
      description: 'Dedicated teachers and mentors committed to every student’s individual growth.',
    },
    {
      icon: 'award',
      title: 'Sports & Co-curricular',
      description: 'A full calendar of athletics, arts and clubs that build confidence beyond the classroom.',
    },
    {
      icon: 'shield',
      title: 'Safe Campus',
      description: 'Secure, well-maintained facilities with dedicated staff attentive to student wellbeing.',
    },
    {
      icon: 'route',
      title: 'Transport Network',
      description: 'Reliable, monitored bus routes covering all major areas of the city.',
    },
    {
      icon: 'wallet',
      title: 'Flexible Fees',
      description: 'Transparent fee structures with scholarships and installment options for families.',
    },
  ];

  readonly whyUs: string[] = [
    'Small class sizes for personalised attention',
    'Digital learning tools integrated into every subject',
    'Regular parent-teacher engagement and progress tracking',
    'Well-stocked library and science laboratories',
    'Counselling and career guidance from grade 9 onward',
  ];

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
    }
  }
}
