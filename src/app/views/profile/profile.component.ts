import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Status, User} from '../model/user.model';
import {UserService} from '../services/user.service';
import Swal from "sweetalert2";
import { Appuser } from '../model/appuser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editFormGroup!: FormGroup;
  user!: User;
  switchLabel: string = 'Disable';
  userId: any;
  file!: File;
  roles!: string | null;
  protected readonly Status = Status;
  constructor(private fb: FormBuilder, private userService: UserService, private router: ActivatedRoute,
              private routerNav: Router, public authService :AuthService) {
  }



  ngOnInit(): void {
    this.roles = localStorage.getItem("roles");
    if (localStorage.getItem("id") != undefined) {
      this.userId = localStorage.getItem("id");
    }
    this.userService.getUtilisateur(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.editFormGroup = this.fb.group({
          id: [this.user.id, [Validators.minLength(1)]],
          solde: [this.user.solde],
          type: [this.user.type],
          prenom: [this.user.prenom],
          nom: [this.user.nom],
          poste: [this.user.poste, [Validators.minLength(3)]],
          tel: [this.user.tel, [Validators.maxLength(10)]],
          email: [this.user.email],
          adresse: [this.user.adresse, [Validators.minLength(5)]],
          status: [this.user.status],
          image: [this.user.image, [Validators.pattern(/\.(png|jpe?g)$/i)]],
          equipeId: [this.user.equipeId],
          password: [null, [Validators.minLength(3)]]
        });
        this.switchLabel = (this.user.status === 'ACTIVE') ? 'Active' : 'Disable';
      }
    );

  }


  onToggleSwitchChange(event: any) {
    this.user.status = event.target.checked ? Status.ACTIVE : Status.DESACTIVE;
    this.switchLabel = (this.user.status === Status.ACTIVE) ? 'Active' : 'Disable';
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onImageChange(event: any) {
    this.file = event.target.files[0];
  }
  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  isFormSubmitted = false;
  saveProfile() {
    this.isFormSubmitted = true;
    this.editProfil();
  }
  editProfil() {
    let user: User = this.editFormGroup.value;
    let appUser: Appuser = this.editFormGroup.value;
    user.status = this.user.status;
    let password = this.editFormGroup.value.password;

    this.userService.editProfile(user, password).subscribe({
      next: (data) => {
        if (this.file) {
          this.userService.uploadUserPhoto(this.userId, this.file).subscribe({
            next: (uploadData) => {
              if (this.isFormSubmitted) {
                this.showSuccessMessage();
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
        } else {
          this.userService.editProfile(user, password).subscribe({
            next: (data) => {
              if (this.isFormSubmitted) {
                this.showSuccessMessage();
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      },
      error: (uploadErr) => {
        console.log(uploadErr);
      },
    });
  }


  showSuccessMessage() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User information updated successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
