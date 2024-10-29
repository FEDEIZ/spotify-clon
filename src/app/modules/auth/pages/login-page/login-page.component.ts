import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;

  constructor(private readonly asAuthService: AuthService, private readonly router: Router){}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    })
  }

  sendLogin():void {
    const {email, password} = this.formLogin.value;
    this.asAuthService.sendCredentials(email, password)
    .subscribe({
      next: () => {
          this.errorSession = false;
          this.router.navigate(['/', 'tracks'])
        },
      error: (err) => {
          console.log(err.message)
          this.errorSession = true;
        }
      })
  }
}

