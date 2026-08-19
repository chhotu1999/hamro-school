import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Dashboard } from './features/dashboard/dashboard';
import { Students } from './features/students/students';
import { Placeholder } from './features/placeholder/placeholder';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: Dashboard },
      { path: 'students', component: Students },

      { path: 'administration/users', component: Placeholder, data: { title: 'User & Authentication', icon: 'key' } },
      { path: 'administration/roles-permissions', component: Placeholder, data: { title: 'Roles & Permissions', icon: 'shield' } },
      { path: 'administration/school-settings', component: Placeholder, data: { title: 'School Settings', icon: 'settings' } },
      { path: 'administration/branches', component: Placeholder, data: { title: 'Branches/Campuses', icon: 'building' } },
      { path: 'administration/academic-year', component: Placeholder, data: { title: 'Academic Year', icon: 'calendar' } },
      { path: 'administration/holidays', component: Placeholder, data: { title: 'Holidays', icon: 'calendar' } },
      { path: 'administration/notifications', component: Placeholder, data: { title: 'Notifications', icon: 'bell' } },

      { path: 'students/registration', component: Placeholder, data: { title: 'Student Registration', icon: 'user-plus' } },
      { path: 'students/enrollment', component: Placeholder, data: { title: 'Student Enrollment', icon: 'user-plus' } },
      { path: 'students/promotion', component: Placeholder, data: { title: 'Student Promotion', icon: 'swap' } },
      { path: 'students/transfer', component: Placeholder, data: { title: 'Student Transfer', icon: 'swap' } },
      { path: 'students/attendance', component: Placeholder, data: { title: 'Student Attendance', icon: 'check-square' } },
      { path: 'students/documents', component: Placeholder, data: { title: 'Student Documents', icon: 'file-text' } },
      { path: 'students/id-cards', component: Placeholder, data: { title: 'Student ID Cards', icon: 'id-card' } },

      { path: 'parents/information', component: Placeholder, data: { title: 'Parent Information', icon: 'users' } },
      { path: 'parents/guardians', component: Placeholder, data: { title: 'Guardian Information', icon: 'users' } },
      { path: 'parents/emergency-contacts', component: Placeholder, data: { title: 'Emergency Contacts', icon: 'phone' } },
      { path: 'parents/login', component: Placeholder, data: { title: 'Parent Login', icon: 'key' } },

      { path: 'staff/teachers', component: Placeholder, data: { title: 'Teacher Management', icon: 'book' } },
      { path: 'staff/non-teaching', component: Placeholder, data: { title: 'Non-Teaching Staff', icon: 'briefcase' } },
      { path: 'staff/departments', component: Placeholder, data: { title: 'Departments', icon: 'briefcase' } },
      { path: 'staff/designations', component: Placeholder, data: { title: 'Designations', icon: 'award' } },
      { path: 'staff/attendance', component: Placeholder, data: { title: 'Staff Attendance', icon: 'check-square' } },
      { path: 'staff/payroll', component: Placeholder, data: { title: 'Payroll', icon: 'wallet' } },

      { path: 'academics/classes', component: Placeholder, data: { title: 'Classes', icon: 'grid' } },
      { path: 'academics/sections', component: Placeholder, data: { title: 'Sections', icon: 'grid' } },
      { path: 'academics/subjects', component: Placeholder, data: { title: 'Subjects', icon: 'book' } },
      { path: 'academics/subject-groups', component: Placeholder, data: { title: 'Subject Groups', icon: 'book' } },
      { path: 'academics/teacher-assignment', component: Placeholder, data: { title: 'Teacher Subject Assignment', icon: 'users' } },
      { path: 'academics/timetable', component: Placeholder, data: { title: 'Timetable', icon: 'calendar' } },
      { path: 'academics/classroom-allocation', component: Placeholder, data: { title: 'Classroom Allocation', icon: 'building' } },
      { path: 'academics/lesson-planning', component: Placeholder, data: { title: 'Lesson Planning', icon: 'file-text' } },

      { path: 'examinations/exam-types', component: Placeholder, data: { title: 'Exam Types', icon: 'award' } },
      { path: 'examinations/exams', component: Placeholder, data: { title: 'Exams', icon: 'award' } },
      { path: 'examinations/marks-entry', component: Placeholder, data: { title: 'Marks Entry', icon: 'file-text' } },
      { path: 'examinations/grade-system', component: Placeholder, data: { title: 'Grade System', icon: 'award' } },
      { path: 'examinations/report-cards', component: Placeholder, data: { title: 'Report Cards', icon: 'file-text' } },
      { path: 'examinations/result-publishing', component: Placeholder, data: { title: 'Result Publishing', icon: 'bell' } },
      { path: 'examinations/transcripts', component: Placeholder, data: { title: 'Transcripts', icon: 'file-text' } },

      { path: 'attendance/students', component: Placeholder, data: { title: 'Student Attendance', icon: 'check-square' } },
      { path: 'attendance/teachers', component: Placeholder, data: { title: 'Teacher Attendance', icon: 'check-square' } },
      { path: 'attendance/staff', component: Placeholder, data: { title: 'Staff Attendance', icon: 'check-square' } },
      { path: 'attendance/reports', component: Placeholder, data: { title: 'Attendance Reports', icon: 'chart-bar' } },
      { path: 'attendance/leave', component: Placeholder, data: { title: 'Leave Management', icon: 'calendar' } },

      { path: 'finance/fee-categories', component: Placeholder, data: { title: 'Fee Categories', icon: 'wallet' } },
      { path: 'finance/fee-structures', component: Placeholder, data: { title: 'Fee Structures', icon: 'wallet' } },
      { path: 'finance/billing', component: Placeholder, data: { title: 'Student Billing', icon: 'file-text' } },
      { path: 'finance/fee-collection', component: Placeholder, data: { title: 'Fee Collection', icon: 'wallet' } },
      { path: 'finance/discounts', component: Placeholder, data: { title: 'Discounts', icon: 'percent' } },
      { path: 'finance/scholarships', component: Placeholder, data: { title: 'Scholarships', icon: 'gift' } },
      { path: 'finance/fines', component: Placeholder, data: { title: 'Fines', icon: 'alert-triangle' } },
      { path: 'finance/payment-methods', component: Placeholder, data: { title: 'Payment Methods', icon: 'credit-card' } },
      { path: 'finance/receipts', component: Placeholder, data: { title: 'Receipts', icon: 'file-text' } },

      { path: 'library/books', component: Placeholder, data: { title: 'Books', icon: 'book' } },
      { path: 'library/categories', component: Placeholder, data: { title: 'Book Categories', icon: 'book' } },
      { path: 'library/authors', component: Placeholder, data: { title: 'Authors', icon: 'users' } },
      { path: 'library/publishers', component: Placeholder, data: { title: 'Publishers', icon: 'briefcase' } },
      { path: 'library/issue-return', component: Placeholder, data: { title: 'Book Issue/Return', icon: 'swap' } },
      { path: 'library/reservations', component: Placeholder, data: { title: 'Book Reservations', icon: 'calendar' } },
      { path: 'library/fines', component: Placeholder, data: { title: 'Library Fines', icon: 'alert-triangle' } },

      { path: 'transport/routes', component: Placeholder, data: { title: 'Routes', icon: 'route' } },
      { path: 'transport/stops', component: Placeholder, data: { title: 'Stops', icon: 'route' } },
      { path: 'transport/vehicles', component: Placeholder, data: { title: 'Vehicles', icon: 'truck' } },
      { path: 'transport/drivers', component: Placeholder, data: { title: 'Drivers', icon: 'users' } },
      { path: 'transport/route-assignment', component: Placeholder, data: { title: 'Route Assignment', icon: 'route' } },
      { path: 'transport/fees', component: Placeholder, data: { title: 'Transport Fees', icon: 'wallet' } },

      { path: 'hostel/hostels', component: Placeholder, data: { title: 'Hostels', icon: 'home' } },
      { path: 'hostel/buildings', component: Placeholder, data: { title: 'Buildings', icon: 'building' } },
      { path: 'hostel/rooms', component: Placeholder, data: { title: 'Rooms', icon: 'home' } },
      { path: 'hostel/bed-allocation', component: Placeholder, data: { title: 'Bed Allocation', icon: 'home' } },
      { path: 'hostel/attendance', component: Placeholder, data: { title: 'Hostel Attendance', icon: 'check-square' } },
      { path: 'hostel/fees', component: Placeholder, data: { title: 'Hostel Fees', icon: 'wallet' } },

      { path: 'inventory/categories', component: Placeholder, data: { title: 'Categories', icon: 'box' } },
      { path: 'inventory/items', component: Placeholder, data: { title: 'Items', icon: 'box' } },
      { path: 'inventory/suppliers', component: Placeholder, data: { title: 'Suppliers', icon: 'truck' } },
      { path: 'inventory/purchases', component: Placeholder, data: { title: 'Purchases', icon: 'wallet' } },
      { path: 'inventory/stock', component: Placeholder, data: { title: 'Stock', icon: 'box' } },
      { path: 'inventory/issue-items', component: Placeholder, data: { title: 'Issue Items', icon: 'swap' } },
      { path: 'inventory/stock-reports', component: Placeholder, data: { title: 'Stock Reports', icon: 'chart-bar' } },

      { path: 'communication/notifications', component: Placeholder, data: { title: 'Notifications', icon: 'bell' } },
      { path: 'communication/sms', component: Placeholder, data: { title: 'SMS', icon: 'mail' } },
      { path: 'communication/email', component: Placeholder, data: { title: 'Email', icon: 'mail' } },
      { path: 'communication/announcements', component: Placeholder, data: { title: 'Announcements', icon: 'bell' } },
      { path: 'communication/push-notifications', component: Placeholder, data: { title: 'Push Notifications', icon: 'bell' } },

      { path: 'reports/students', component: Placeholder, data: { title: 'Student Reports', icon: 'chart-bar' } },
      { path: 'reports/attendance', component: Placeholder, data: { title: 'Attendance Reports', icon: 'chart-bar' } },
      { path: 'reports/examinations', component: Placeholder, data: { title: 'Examination Reports', icon: 'chart-bar' } },
      { path: 'reports/financial', component: Placeholder, data: { title: 'Financial Reports', icon: 'chart-bar' } },
      { path: 'reports/payroll', component: Placeholder, data: { title: 'Payroll Reports', icon: 'chart-bar' } },
      { path: 'reports/library', component: Placeholder, data: { title: 'Library Reports', icon: 'chart-bar' } },
      { path: 'reports/inventory', component: Placeholder, data: { title: 'Inventory Reports', icon: 'chart-bar' } },
      { path: 'reports/dashboard', component: Placeholder, data: { title: 'Dashboard', icon: 'grid' } },

      { path: 'audit/user-activity', component: Placeholder, data: { title: 'User Activity', icon: 'activity' } },
      { path: 'audit/login-history', component: Placeholder, data: { title: 'Login History', icon: 'key' } },
      { path: 'audit/data-changes', component: Placeholder, data: { title: 'Data Changes', icon: 'file-text' } },
      { path: 'audit/system-logs', component: Placeholder, data: { title: 'System Logs', icon: 'activity' } },
    ],
  },
];
