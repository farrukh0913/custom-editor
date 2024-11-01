import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  public formSubmitted = false;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.email?.value, this.password?.value);
      setTimeout(() => {
        if (this.authService.isAuthenticated()) {
          this.route.navigate(['/home']);
        }
      }, 0);
      this.loginForm.reset();
      this.formSubmitted = false;
    }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
