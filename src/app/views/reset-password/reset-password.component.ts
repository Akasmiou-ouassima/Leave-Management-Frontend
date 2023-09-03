import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  showPassword: boolean = false;
  resetPassForm!: FormGroup;
  token:any;
  constructor(private fb: FormBuilder,private authService : AuthService,
              private route: ActivatedRoute,private router : Router){}
  ngOnInit(){

    this.resetPassForm= this.fb.group({
      password : this.fb.control(
        null, Validators.required)
    });

    //token in url
    this.route.queryParams.subscribe((params: any) => {
      this.token = params['token'];
      if (this.token) {
        console.log('Token récupéré:', this.token);
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    const password = this.resetPassForm.value.password;
    this.authService.requestPasswordReset(password,this.token).subscribe({
      next : value => {
        console.log("val "+value);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Password is reset successfully",
          showConfirmButton: false,
          timer: 2000
        });
        this.authService.logout();
      },
      error : err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Error to reset the password",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("err "+err);
      }
    });
  }
}
