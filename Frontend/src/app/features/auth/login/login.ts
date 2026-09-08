import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { BaseService } from '../../../core/base/base.service';
import { IconModule } from '../../../shared/controls/icon/icon.module';
import { MvRoleList } from '../../../shared/models/base.model';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, IconModule],
  templateUrl: './login.html',
  styleUrl: './login.less',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly baseService = inject(BaseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly mode = signal<AuthMode>('login');
  readonly submitting = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly roles = signal<MvRoleList[]>([]);
  readonly rolesLoading = signal(false);

  readonly loginForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  readonly registerForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    roleId: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  switchMode(mode: AuthMode): void {
    this.mode.set(mode);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (mode === 'register' && !this.roles().length && !this.rolesLoading()) {
      this.loadRoles();
    }
  }

  private loadRoles(): void {
    this.rolesLoading.set(true);
    this.baseService
      .getRoleList()
      .pipe(finalize(() => this.rolesLoading.set(false)))
      .subscribe({
        next: (roles) => this.roles.set(roles),
        error: () => this.errorMessage.set('Could not load roles. Please try again.'),
      });
  }

  toggleShowPassword(): void {
    this.showPassword.update((value) => !value);
  }

  submitLogin(): void {
    if (this.loginForm.invalid || this.submitting()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.submitting.set(true);

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigateByUrl(returnUrl || '/app');
        },
        error: (error: unknown) => {
          this.errorMessage.set(error instanceof Error ? error.message : 'Unable to log in. Please try again.');
        },
      });
  }

  submitRegister(): void {
    if (this.registerForm.invalid || this.submitting()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, password, confirmPassword, roleId } = this.registerForm.getRawValue();
    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.errorMessage.set(null);
    this.submitting.set(true);

    this.authService
      .register({ username, password, roleId: roleId! })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (user) => {
          this.registerForm.reset();
          this.successMessage.set(`Account "${user.username}" created. You can now log in.`);
          this.mode.set('login');
          this.loginForm.patchValue({ username: user.username });
        },
        error: (error: unknown) => {
          this.errorMessage.set(error instanceof Error ? error.message : 'Unable to create the account.');
        },
      });
  }
}
