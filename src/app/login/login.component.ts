import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from '../Dto/Login';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  constructor(
    private formbuilder: FormBuilder,
    private accountService:AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.checkForm();
  }

  checkForm() {
    this.loginForm = this.formbuilder.group({
      txtEmail: ['', [Validators.required, Validators.email]],
      txtPassword: ['', Validators.required],
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      const user = new login();
      user.email = this.loginForm.value['txtEmail'];
      user.password = this.loginForm.value['txtPassword'];

      this.accountService.Login(user).subscribe({
        next: data => {
          localStorage.setItem('SecurityKey', data.token);
          this.toastr.success('Logged in successfully', 'Welcome');

          this.accountService.getLoggedInUserInfo(this.loginForm.value['txtEmail']).subscribe({
            next: data => {
              localStorage.setItem('SocialMediaUser', JSON.stringify(data));
              this.router.navigate(['/Dashboard']);
            },
            error: () => {
              this.router.navigate(['/Dashboard']);
            }
          });
        },
        error: err => {
          this.toastr.error('Invalid email or password. Please try again.', 'Login Failed');
        }
      });
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
