import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseUrl = 'https://localhost:7130/api';
  createUser(formData: any){debugger;
    return this.http.post(this.baseUrl+'/signup', formData);
  }

  signIn(formData: any){debugger;
    return this.http.post(this.baseUrl+'/signin', formData);
  }
}
