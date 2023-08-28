import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;
  rememberMe: boolean = false;
  loginFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authService : AuthService,private router:Router,
              @Inject(CookieService) private cookieService: CookieService,private toastr: ToastrService) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    console.log(this,this.rememberMe)

  }
  ngOnInit(){
    this.authService.logout();
    this.loginFormGroup = this.fb.group({
      email : this.fb.control(null, [Validators.required, Validators.email]),
      password : this.fb.control(null, Validators.required),
    });
    const storedEmail = this.cookieService.get('rememberedEmail');
    const storedPassword = this.cookieService.get('rememberedPassword');

    if (storedEmail && storedPassword) {
      this.loginFormGroup.patchValue({
        email: storedEmail,
        password: storedPassword,
      });
    }
  }


  handleLogin() {
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;
    this.authService.login(email,password).subscribe({
      next : reponse => {
        this.toastr.success("Login successful!", "Success", { positionClass: 'toast-top-right'
          , progressBar: true,tapToDismiss: true,timeOut: 2000 , closeButton: true});
        this.authService.loadProfile(reponse);
        this.router.navigateByUrl("dashboard");
        console.log("response" +JSON.stringify(reponse));
        if (this.rememberMe) {
          this.cookieService.set('rememberedEmail', email);
          this.cookieService.set('rememberedPassword', password);
        } else {
          this.cookieService.delete('rememberedEmail');
          this.cookieService.delete('rememberedPassword');
        }
      },
        error: err => {
        if (err.status === 401) {
          this.toastr.error("Sorry, we could not find your account.", "Error", { positionClass: 'toast-top-right'
          , progressBar: true,tapToDismiss: true,timeOut: 5000 });
        } else {
          this.toastr.error("An error occurred. Please try again later.", "Error", { positionClass: 'toast-top-right' });
        }

        console.log("error: " + JSON.stringify(err));
      }
    })
  }
}
