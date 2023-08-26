import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;
  loginFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authService : AuthService,private router:Router) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(){
    this.authService.logout();
    this.loginFormGroup = this.fb.group({
      email : this.fb.control(
        null,
        [Validators.required,
          Validators.email]),
      password : this.fb.control(null, Validators.required),
    });
  }


  handleLogin() {
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;
    console.log(email," ",password);
    this.authService.login(email,password).subscribe({
      next : reponse => {

        this.authService.loadProfile(reponse);
        this.router.navigateByUrl("dashboard");
        console.log("response" +JSON.stringify(reponse));

      },
      error : err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "The information you have provided is not accurate." +
            " Please make another attempt and provide correct information.",
          showConfirmButton: false,
          timer: 1500
        });

        console.log("error : "+err);
      }
    })
  }
}
