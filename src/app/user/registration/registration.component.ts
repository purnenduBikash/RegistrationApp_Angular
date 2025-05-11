import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form: any; // Declare the form property here

  constructor(public formBuilder: FormBuilder) { // Initialize formBuilder in the constructor
    this.form = this.formBuilder.group({
      fullName : [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
  onSubmit(){
    console.log(this.form.value);
   } 
}