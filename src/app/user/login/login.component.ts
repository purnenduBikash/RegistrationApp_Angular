import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any;
  isSubmitted : boolean = false
  constructor(public formBuilder: FormBuilder){
  this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]});
    }
    
      hasDisplaybleError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))

  }
  onSubmit(){
    this.isSubmitted = true
  }
}
