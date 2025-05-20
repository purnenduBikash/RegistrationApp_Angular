import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any;
  isSubmitted : boolean = false
  constructor(public formBuilder: FormBuilder, private service: AuthService, private router: Router){
  this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]});
    }
    
      hasDisplaybleError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))

  }
  error:any
  onSubmit(){

    this.isSubmitted = true
    if(this.form.valid){
      this.service.signIn(this.form.value).subscribe({
        next:(res:any)=>{
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error:err => {
          if(err.status == 400){
            this.error =("Login Failed")
            console.log(this.error)
          }
        }
      })
    }
  }
}
