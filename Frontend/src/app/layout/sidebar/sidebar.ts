import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { IconName } from '../../shared/controls/icon/icon.component';
import { IconModule } from '../../shared/controls/icon/icon.module';

interface NavItem {
  label: string;
  icon: IconName;
  link?: string;
}

interface NavSection {
  title: string;
  icon: IconName;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, IconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
})
export class Sidebar {
  private router = inject(Router);

  sections: NavSection[] = [
    {
      title: 'Overview',
      icon: 'grid',
      items: [
        { label: 'Dashboard', icon: 'grid', link: '/' },
        { label: 'Students', icon: 'users', link: '/students' },
      ],
    },
    {
      title: 'Administration',
      icon: 'settings',
      items: [
        { label: 'User & Authentication', icon: 'key', link: '/administration/users' },
        { label: 'Roles & Permissions', icon: 'shield', link: '/administration/roles-permissions' },
        { label: 'School Settings', icon: 'settings', link: '/administration/school-settings' },
        { label: 'Branches/Campuses', icon: 'building', link: '/administration/branches' },
        { label: 'Academic Year', icon: 'calendar', link: '/administration/academic-year' },
        { label: 'Holidays', icon: 'calendar', link: '/administration/holidays' },
        { label: 'Notifications', icon: 'bell', link: '/administration/notifications' },
      ],
    },
    {
      title: 'Student Management',
      icon: 'user-plus',
      items: [
        { label: 'Student Directory', icon: 'user-plus', link: '/student-management/student' },
        { label: 'Student Registration', icon: 'user-plus', link: '/students/registration' },
        { label: 'Student Enrollment', icon: 'user-plus', link: '/students/enrollment' },
        { label: 'Student Promotion', icon: 'swap', link: '/students/promotion' },
        { label: 'Student Transfer', icon: 'swap', link: '/students/transfer' },
        { label: 'Student Attendance', icon: 'check-square', link: '/students/attendance' },
        { label: 'Student Documents', icon: 'file-text', link: '/students/documents' },
        { label: 'Student ID Cards', icon: 'id-card', link: '/students/id-cards' },
      ],
    },
    {
      title: 'Parent & Guardian Management',
      icon: 'users',
      items: [
        { label: 'Parent Information', icon: 'users', link: '/parents/information' },
        { label: 'Guardian Information', icon: 'users', link: '/parents/guardians' },
        { label: 'Emergency Contacts', icon: 'phone', link: '/parents/emergency-contacts' },
        { label: 'Parent Login', icon: 'key', link: '/parents/login' },
      ],
    },
    {
      title: 'Staff Management',
      icon: 'briefcase',
      items: [
        { label: 'Staff Directory', icon: 'briefcase', link: '/staff-management/staff' },
        { label: 'Teacher Management', icon: 'book', link: '/staff/teachers' },
        { label: 'Non-Teaching Staff', icon: 'briefcase', link: '/staff/non-teaching' },
        { label: 'Departments', icon: 'briefcase', link: '/staff/departments' },
        { label: 'Designations', icon: 'award', link: '/staff/designations' },
        { label: 'Staff Attendance', icon: 'check-square', link: '/staff/attendance' },
        { label: 'Payroll', icon: 'wallet', link: '/staff/payroll' },
      ],
    },
    {
      title: 'Academic Management',
      icon: 'book',
      items: [
        { label: 'Classes', icon: 'grid', link: '/academics/classes' },
        { label: 'Sections', icon: 'grid', link: '/academics/sections' },
        { label: 'Subjects', icon: 'book', link: '/academics/subjects' },
        { label: 'Subject Groups', icon: 'book', link: '/academics/subject-groups' },
        { label: 'Teacher Subject Assignment', icon: 'users', link: '/academics/teacher-assignment' },
        { label: 'Timetable', icon: 'calendar', link: '/academics/timetable' },
        { label: 'Classroom Allocation', icon: 'building', link: '/academics/classroom-allocation' },
        { label: 'Lesson Planning', icon: 'file-text', link: '/academics/lesson-planning' },
      ],
    },
    {
      title: 'Examination Management',
      icon: 'award',
      items: [
        { label: 'Exam Types', icon: 'award', link: '/examinations/exam-types' },
        { label: 'Exams', icon: 'award', link: '/examinations/exams' },
        { label: 'Marks Entry', icon: 'file-text', link: '/examinations/marks-entry' },
        { label: 'Grade System', icon: 'award', link: '/examinations/grade-system' },
        { label: 'Report Cards', icon: 'file-text', link: '/examinations/report-cards' },
        { label: 'Result Publishing', icon: 'bell', link: '/examinations/result-publishing' },
        { label: 'Transcripts', icon: 'file-text', link: '/examinations/transcripts' },
      ],
    },
    {
      title: 'Attendance Management',
      icon: 'check-square',
      items: [
        { label: 'Student Attendance', icon: 'check-square', link: '/attendance/students' },
        { label: 'Teacher Attendance', icon: 'check-square', link: '/attendance/teachers' },
        { label: 'Staff Attendance', icon: 'check-square', link: '/attendance/staff' },
        { label: 'Attendance Reports', icon: 'chart-bar', link: '/attendance/reports' },
        { label: 'Leave Management', icon: 'calendar', link: '/attendance/leave' },
      ],
    },
    {
      title: 'Finance Management',
      icon: 'wallet',
      items: [
        { label: 'Fee Categories', icon: 'wallet', link: '/finance/fee-categories' },
        { label: 'Fee Structures', icon: 'wallet', link: '/finance/fee-structures' },
        { label: 'Student Billing', icon: 'file-text', link: '/finance/billing' },
        { label: 'Fee Collection', icon: 'wallet', link: '/finance/fee-collection' },
        { label: 'Discounts', icon: 'percent', link: '/finance/discounts' },
        { label: 'Scholarships', icon: 'gift', link: '/finance/scholarships' },
        { label: 'Fines', icon: 'alert-triangle', link: '/finance/fines' },
        { label: 'Payment Methods', icon: 'credit-card', link: '/finance/payment-methods' },
        { label: 'Receipts', icon: 'file-text', link: '/finance/receipts' },
      ],
    },
    {
      title: 'Library Management',
      icon: 'book',
      items: [
        { label: 'Books', icon: 'book', link: '/library/books' },
        { label: 'Book Categories', icon: 'book', link: '/library/categories' },
        { label: 'Authors', icon: 'users', link: '/library/authors' },
        { label: 'Publishers', icon: 'briefcase', link: '/library/publishers' },
        { label: 'Book Issue/Return', icon: 'swap', link: '/library/issue-return' },
        { label: 'Book Reservations', icon: 'calendar', link: '/library/reservations' },
        { label: 'Library Fines', icon: 'alert-triangle', link: '/library/fines' },
      ],
    },
    {
      title: 'Transport Management',
      icon: 'route',
      items: [
        { label: 'Routes', icon: 'route', link: '/transport/routes' },
        { label: 'Stops', icon: 'route', link: '/transport/stops' },
        { label: 'Vehicles', icon: 'truck', link: '/transport/vehicles' },
        { label: 'Drivers', icon: 'users', link: '/transport/drivers' },
        { label: 'Route Assignment', icon: 'route', link: '/transport/route-assignment' },
        { label: 'Transport Fees', icon: 'wallet', link: '/transport/fees' },
      ],
    },
    {
      title: 'Hostel Management',
      icon: 'home',
      items: [
        { label: 'Hostels', icon: 'home', link: '/hostel/hostels' },
        { label: 'Buildings', icon: 'building', link: '/hostel/buildings' },
        { label: 'Rooms', icon: 'home', link: '/hostel/rooms' },
        { label: 'Bed Allocation', icon: 'home', link: '/hostel/bed-allocation' },
        { label: 'Hostel Attendance', icon: 'check-square', link: '/hostel/attendance' },
        { label: 'Hostel Fees', icon: 'wallet', link: '/hostel/fees' },
      ],
    },
    {
      title: 'Inventory Management',
      icon: 'box',
      items: [
        { label: 'Categories', icon: 'box', link: '/inventory/categories' },
        { label: 'Items', icon: 'box', link: '/inventory/items' },
        { label: 'Suppliers', icon: 'truck', link: '/inventory/suppliers' },
        { label: 'Purchases', icon: 'wallet', link: '/inventory/purchases' },
        { label: 'Stock', icon: 'box', link: '/inventory/stock' },
        { label: 'Issue Items', icon: 'swap', link: '/inventory/issue-items' },
        { label: 'Stock Reports', icon: 'chart-bar', link: '/inventory/stock-reports' },
      ],
    },
    {
      title: 'Communication',
      icon: 'mail',
      items: [
        { label: 'Notifications', icon: 'bell', link: '/communication/notifications' },
        { label: 'SMS', icon: 'mail', link: '/communication/sms' },
        { label: 'Email', icon: 'mail', link: '/communication/email' },
        { label: 'Announcements', icon: 'bell', link: '/communication/announcements' },
        { label: 'Push Notifications', icon: 'bell', link: '/communication/push-notifications' },
      ],
    },
    {
      title: 'Reports',
      icon: 'chart-bar',
      items: [
        { label: 'Student Reports', icon: 'chart-bar', link: '/reports/students' },
        { label: 'Attendance Reports', icon: 'chart-bar', link: '/reports/attendance' },
        { label: 'Examination Reports', icon: 'chart-bar', link: '/reports/examinations' },
        { label: 'Financial Reports', icon: 'chart-bar', link: '/reports/financial' },
        { label: 'Payroll Reports', icon: 'chart-bar', link: '/reports/payroll' },
        { label: 'Library Reports', icon: 'chart-bar', link: '/reports/library' },
        { label: 'Inventory Reports', icon: 'chart-bar', link: '/reports/inventory' },
        { label: 'Dashboard', icon: 'grid', link: '/reports/dashboard' },
      ],
    },
    {
      title: 'Audit & Logs',
      icon: 'activity',
      items: [
        { label: 'User Activity', icon: 'activity', link: '/audit/user-activity' },
        { label: 'Login History', icon: 'key', link: '/audit/login-history' },
        { label: 'Data Changes', icon: 'file-text', link: '/audit/data-changes' },
        { label: 'System Logs', icon: 'activity', link: '/audit/system-logs' },
      ],
    },
  ];

  private expandedSection = signal<string | null>(this.sections[0].title);
  collapsed = signal(false);

  constructor() {
    this.syncFromUrl(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.syncFromUrl(event.urlAfterRedirects));
  }

  private syncFromUrl(url: string): void {
    const path = url.split('?')[0];
    const match = this.sections.find((section) => section.items.some((item) => item.link === path));
    if (match) {
      this.expandedSection.set(match.title);
    }
  }

  isExpanded(title: string): boolean {
    return this.expandedSection() === title;
  }

  toggleSection(section: NavSection): void {
    const firstLink = section.items.find((item) => item.link)?.link;

    if (this.collapsed()) {
      this.expandedSection.set(section.title);
      if (firstLink) {
        this.router.navigateByUrl(firstLink);
      }
      return;
    }

    if (this.isExpanded(section.title)) {
      this.expandedSection.set(null);
      return;
    }
    this.expandedSection.set(section.title);
    if (firstLink) {
      this.router.navigateByUrl(firstLink);
    }
  }

  toggleCollapsed(): void {
    this.collapsed.update((v) => !v);
  }
}
