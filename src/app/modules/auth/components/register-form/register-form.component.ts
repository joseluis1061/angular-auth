import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';
import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusAvailable: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  messageError: string = '';
  availableUser!: boolean;


  formAvailable = this.formBuilder.nonNullable.group({
    emailAvailable: ['', [Validators.email, Validators.required]],
  });



  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);

      this.authService.registerAndLogin(name, email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards'])
        },
        error: (error) => {
          this.status = 'failed';

          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            this.messageError = 'This user already exists. Do you want to Login?';
          }
          this.status = 'failed';
          console.log(error);
        }
      })

    } else {
      this.form.markAllAsTouched();
    }
  }

  isUserAvailable(){

    if (this.formAvailable.valid) {
      this.statusAvailable = 'loading';
      const {  emailAvailable } = this.formAvailable.getRawValue();
      console.log(emailAvailable);

      this.authService.isAvailable(emailAvailable)
      .subscribe({
        next: (response) => {
          this.statusAvailable = 'success';
          this.availableUser = response.isAvailable;
          if(response.isAvailable){
            console.log(response.isAvailable)
            this.form.controls.email.setValue(emailAvailable)
          }else{
            this.router.navigate(['/login'], {queryParams: {email: emailAvailable}})
          }
        },
        error: (error) => {
          this.statusAvailable = 'failed';

          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            this.messageError = 'This user already exists. Do you want to Login?';
          }
          this.statusAvailable = 'failed';
          console.log(error);
        }
      })

    } else {
      this.formAvailable.markAllAsTouched();
    }
  }
}
