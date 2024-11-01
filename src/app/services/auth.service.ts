import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(email: string, password: any) {
    const userData = localStorage.getItem('user') || "";
    if (userData){
      const user = JSON.parse(userData);
      if (user.email === email) {
        if (user.password === password) {
          localStorage.setItem('token', '12345');
        } else {
          console.log("Password is incorrect");
        }
      } else {
        console.log("email not found");
      }
    } else {
      localStorage.setItem('user', JSON.stringify({email: email, password: password}));
      localStorage.setItem('token', '12345');
    }

  }
}
