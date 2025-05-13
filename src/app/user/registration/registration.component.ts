import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form: any; // Declare the form property here
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null)
    return null;
  }
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private service: AuthService) { // Initialize formBuilder in the constructor

    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }
  onSubmit() {
    this.isSubmitted = true
    if (this.form.valid) {debugger;
      this.service.createUser(this.form.value)
    .subscribe({
        next: (res:any) => {
          if(res.succeeded){
            this.form.reset();
            this.isSubmitted = false;
            
          }
          else{
            console.log('response', res);
          }
          

        },
        error: err => console.log('error', err)
      });
    }
  }

  hasDisplaybleError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))

  }
}