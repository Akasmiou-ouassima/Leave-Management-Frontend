import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit{
  passFormGroup!: FormGroup;
  show1=false;
  show2=false;
  constructor(private fb: FormBuilder,private authService : AuthService){}
  ngOnInit(){
    this.show1=true;
    this.passFormGroup = this.fb.group({
      email : this.fb.control(
        null,
        [Validators.required,
          Validators.email])
    });
  }
  maskEmail(email: string): string {
    const atIndex = email.indexOf('@');
    const maskedPart = email.substring(0, 1) + '*'.repeat(atIndex - 2)+email.substring(atIndex-2, atIndex-1);
    const domainPart = email.substring(atIndex);
    return maskedPart + domainPart;
  }
  onSubmit() {
    this.show1=false;
    this.show2=true;
    const email = this.passFormGroup.value.email;
    console.log(email);
    this.authService.requestPasswordforget(email).subscribe({
      next : value => {
        console.log(value);
      },
      error : err => {
        console.log(err);
      }
    });
  }

}
