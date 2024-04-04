import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';
import { CustomValidators } from '@utils/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  newToken: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.newToken = this.activatedRoute.snapshot.queryParamMap.get('recoveryToken')
  }

  recovery() {
    if (this.form.valid) {
      const {newPassword} = this.form.getRawValue()
      if(this.newToken){
        this.authService.changePassword(this.newToken, newPassword).subscribe({
          next:() => {
            this.status = 'success';
            this.router.navigate(['app/boards']);
          },
          error: (error) => {
            this.status = 'failed';
            console.log(error);
          }
        })
      }
      
    } else {
      this.form.markAllAsTouched();
    }
  }
}
