import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email).subscribe({
        next: (response) => {
          this.status= 'success';
          this.router.navigate(['/recovery'], {queryParams: {recoveryToken: response.recoveryToken}})
        },
        error: (error) => {
          this.status= 'failed';
          console.log(error);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
