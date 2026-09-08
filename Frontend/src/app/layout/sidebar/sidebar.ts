import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
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
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  userInitials = computed(() => {
    const username = this.currentUser()?.username ?? '';
    return username.slice(0, 2).toUpperCase() || 'HS';
  });

  sections: NavSection[] = [
    {
      title: 'Overview',
      icon: 'grid',
      items: [
        { label: 'Dashboard', icon: 'grid', link: '/app' },
        { label: 'Students', icon: 'users', link: '/app/students' },
      ],
    },
    {
      title: 'Administration',
      icon: 'settings',
      items: [
        { label: 'User & Authentication', icon: 'key', link: '/app/administration/users' },
        { label: 'Roles & Permissions', icon: 'shield', link: '/app/administration/roles-permissions' },
        { label: 'School Settings', icon: 'settings', link: '/app/administration/school-settings' },
        { label: 'Branches/Campuses', icon: 'building', link: '/app/administration/branches' },
        { label: 'Academic Year', icon: 'calendar', link: '/app/administration/academic-year' },
        { label: 'Holidays', icon: 'calendar', link: '/app/administration/holidays' },
        { label: 'Notifications', icon: 'bell', link: '/app/administration/notifications' },
      ],
    },
    {
      title: 'Student Management',
      icon: 'user-plus',
      items: [
        { label: 'Student Directory', icon: 'user-plus', link: '/app/student-management/student' },
        { label: 'Student Registration', icon: 'user-plus', link: '/app/students/registration' },
        { label: 'Student Enrollment', icon: 'user-plus', link: '/app/students/enrollment' },
        { label: 'Student Promotion', icon: 'swap', link: '/app/students/promotion' },
        { label: 'Student Transfer', icon: 'swap', link: '/app/students/transfer' },
        { label: 'Student Attendance', icon: 'check-square', link: '/app/students/attendance' },
        { label: 'Student Documents', icon: 'file-text', link: '/app/students/documents' },
        { label: 'Student ID Cards', icon: 'id-card', link: '/app/students/id-cards' },
      ],
    },
    {
      title: 'Parent & Guardian Management',
      icon: 'users',
      items: [
        { label: 'Parent Information', icon: 'users', link: '/app/parents/information' },
        { label: 'Guardian Information', icon: 'users', link: '/app/parents/guardians' },
        { label: 'Emergency Contacts', icon: 'phone', link: '/app/parents/emergency-contacts' },
        { label: 'Parent Login', icon: 'key', link: '/app/parents/login' },
      ],
    },
    {
      title: 'Staff Management',
      icon: 'briefcase',
      items: [
        { label: 'Staff Directory', icon: 'briefcase', link: '/app/staff-management/staff' },
        { label: 'Teacher Management', icon: 'book', link: '/app/staff/teachers' },
        { label: 'Non-Teaching Staff', icon: 'briefcase', link: '/app/staff/non-teaching' },
        { label: 'Departments', icon: 'briefcase', link: '/app/staff/departments' },
        { label: 'Designations', icon: 'award', link: '/app/staff/designations' },
        { label: 'Staff Attendance', icon: 'check-square', link: '/app/staff/attendance' },
        { label: 'Payroll', icon: 'wallet', link: '/app/staff/payroll' },
      ],
    },
    {
      title: 'Academic Management',
      icon: 'book',
      items: [
        { label: 'Classes', icon: 'grid', link: '/app/academics/classes' },
        { label: 'Sections', icon: 'grid', link: '/app/academics/sections' },
        { label: 'Subjects', icon: 'book', link: '/app/academics/subjects' },
        { label: 'Subject Groups', icon: 'book', link: '/app/academics/subject-groups' },
        { label: 'Teacher Subject Assignment', icon: 'users', link: '/app/academics/teacher-assignment' },
        { label: 'Timetable', icon: 'calendar', link: '/app/academics/timetable' },
        { label: 'Classroom Allocation', icon: 'building', link: '/app/academics/classroom-allocation' },
        { label: 'Lesson Planning', icon: 'file-text', link: '/app/academics/lesson-planning' },
      ],
    },
    {
      title: 'Examination Management',
      icon: 'award',
      items: [
        { label: 'Exam Types', icon: 'award', link: '/app/examinations/exam-types' },
        { label: 'Exams', icon: 'award', link: '/app/examinations/exams' },
        { label: 'Marks Entry', icon: 'file-text', link: '/app/examinations/marks-entry' },
        { label: 'Grade System', icon: 'award', link: '/app/examinations/grade-system' },
        { label: 'Report Cards', icon: 'file-text', link: '/app/examinations/report-cards' },
        { label: 'Result Publishing', icon: 'bell', link: '/app/examinations/result-publishing' },
        { label: 'Transcripts', icon: 'file-text', link: '/app/examinations/transcripts' },
      ],
    },
    {
      title: 'Attendance Management',
      icon: 'check-square',
      items: [
        { label: 'Student Attendance', icon: 'check-square', link: '/app/attendance/students' },
        { label: 'Teacher Attendance', icon: 'check-square', link: '/app/attendance/teachers' },
        { label: 'Staff Attendance', icon: 'check-square', link: '/app/attendance/staff' },
        { label: 'Attendance Reports', icon: 'chart-bar', link: '/app/attendance/reports' },
        { label: 'Leave Management', icon: 'calendar', link: '/app/attendance/leave' },
      ],
    },
    {
      title: 'Finance Management',
      icon: 'wallet',
      items: [
        { label: 'Fee Categories', icon: 'wallet', link: '/app/finance/fee-categories' },
        { label: 'Fee Structures', icon: 'wallet', link: '/app/finance/fee-structures' },
        { label: 'Student Billing', icon: 'file-text', link: '/app/finance/billing' },
        { label: 'Fee Collection', icon: 'wallet', link: '/app/finance/fee-collection' },
        { label: 'Discounts', icon: 'percent', link: '/app/finance/discounts' },
        { label: 'Scholarships', icon: 'gift', link: '/app/finance/scholarships' },
        { label: 'Fines', icon: 'alert-triangle', link: '/app/finance/fines' },
        { label: 'Payment Methods', icon: 'credit-card', link: '/app/finance/payment-methods' },
        { label: 'Receipts', icon: 'file-text', link: '/app/finance/receipts' },
      ],
    },
    {
      title: 'Library Management',
      icon: 'book',
      items: [
        { label: 'Books', icon: 'book', link: '/app/library/books' },
        { label: 'Book Categories', icon: 'book', link: '/app/library/categories' },
        { label: 'Authors', icon: 'users', link: '/app/library/authors' },
        { label: 'Publishers', icon: 'briefcase', link: '/app/library/publishers' },
        { label: 'Book Issue/Return', icon: 'swap', link: '/app/library/issue-return' },
        { label: 'Book Reservations', icon: 'calendar', link: '/app/library/reservations' },
        { label: 'Library Fines', icon: 'alert-triangle', link: '/app/library/fines' },
      ],
    },
    {
      title: 'Transport Management',
      icon: 'route',
      items: [
        { label: 'Routes', icon: 'route', link: '/app/transport/routes' },
        { label: 'Stops', icon: 'route', link: '/app/transport/stops' },
        { label: 'Vehicles', icon: 'truck', link: '/app/transport/vehicles' },
        { label: 'Drivers', icon: 'users', link: '/app/transport/drivers' },
        { label: 'Route Assignment', icon: 'route', link: '/app/transport/route-assignment' },
        { label: 'Transport Fees', icon: 'wallet', link: '/app/transport/fees' },
      ],
    },
    {
      title: 'Hostel Management',
      icon: 'home',
      items: [
        { label: 'Hostels', icon: 'home', link: '/app/hostel/hostels' },
        { label: 'Buildings', icon: 'building', link: '/app/hostel/buildings' },
        { label: 'Rooms', icon: 'home', link: '/app/hostel/rooms' },
        { label: 'Bed Allocation', icon: 'home', link: '/app/hostel/bed-allocation' },
        { label: 'Hostel Attendance', icon: 'check-square', link: '/app/hostel/attendance' },
        { label: 'Hostel Fees', icon: 'wallet', link: '/app/hostel/fees' },
      ],
    },
    {
      title: 'Inventory Management',
      icon: 'box',
      items: [
        { label: 'Categories', icon: 'box', link: '/app/inventory/categories' },
        { label: 'Items', icon: 'box', link: '/app/inventory/items' },
        { label: 'Suppliers', icon: 'truck', link: '/app/inventory/suppliers' },
        { label: 'Purchases', icon: 'wallet', link: '/app/inventory/purchases' },
        { label: 'Stock', icon: 'box', link: '/app/inventory/stock' },
        { label: 'Issue Items', icon: 'swap', link: '/app/inventory/issue-items' },
        { label: 'Stock Reports', icon: 'chart-bar', link: '/app/inventory/stock-reports' },
      ],
    },
    {
      title: 'Communication',
      icon: 'mail',
      items: [
        { label: 'Notifications', icon: 'bell', link: '/app/communication/notifications' },
        { label: 'SMS', icon: 'mail', link: '/app/communication/sms' },
        { label: 'Email', icon: 'mail', link: '/app/communication/email' },
        { label: 'Announcements', icon: 'bell', link: '/app/communication/announcements' },
        { label: 'Push Notifications', icon: 'bell', link: '/app/communication/push-notifications' },
      ],
    },
    {
      title: 'Reports',
      icon: 'chart-bar',
      items: [
        { label: 'Student Reports', icon: 'chart-bar', link: '/app/reports/students' },
        { label: 'Attendance Reports', icon: 'chart-bar', link: '/app/reports/attendance' },
        { label: 'Examination Reports', icon: 'chart-bar', link: '/app/reports/examinations' },
        { label: 'Financial Reports', icon: 'chart-bar', link: '/app/reports/financial' },
        { label: 'Payroll Reports', icon: 'chart-bar', link: '/app/reports/payroll' },
        { label: 'Library Reports', icon: 'chart-bar', link: '/app/reports/library' },
        { label: 'Inventory Reports', icon: 'chart-bar', link: '/app/reports/inventory' },
        { label: 'Dashboard', icon: 'grid', link: '/app/reports/dashboard' },
      ],
    },
    {
      title: 'Audit & Logs',
      icon: 'activity',
      items: [
        { label: 'User Activity', icon: 'activity', link: '/app/audit/user-activity' },
        { label: 'Login History', icon: 'key', link: '/app/audit/login-history' },
        { label: 'Data Changes', icon: 'file-text', link: '/app/audit/data-changes' },
        { label: 'System Logs', icon: 'activity', link: '/app/audit/system-logs' },
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

  logout(): void {
    // Session is cleared synchronously by AuthService.logout(); the request
    // below is a best-effort server notification, so navigate immediately.
    this.authService.logout().subscribe({ error: () => {} });
    this.router.navigateByUrl('/login');
  }
}
