import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Status, User} from '../model/user.model';
import {UserService} from '../services/user.service';
import Swal from "sweetalert2";
import { Appuser } from '../model/appuser';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
              private routerNav: Router, public authService :AuthService,private toastr: ToastrService) {
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
          image: [null, [Validators.pattern(/\.(png|jpe?g)$/i)]],
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
    console.log(this.file);
    console.log(this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() == 'jpg' || this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() == 'jpeg' || this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() == 'png')
    if( this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() != 'jpg' || this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() != 'jpeg' || this.file.name.slice(this.file.name.lastIndexOf('.') + 1).toLowerCase() != 'png'){
      this.toastr.warning("Please upload a valid image (jpg, jpeg, or png).", "Warning", {
        positionClass: 'toast-center-center',
        progressBar: true,
        tapToDismiss: true,
        timeOut: 5000
      });
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
    let status = this.editFormGroup.value.status;

    if (this.file) {
      this.userService.editProfile(user, password).subscribe({
        next: (data) => {
          this.userService.uploadUserPhoto(this.userId, this.file).subscribe({
            next: (uploadData) => {
              if (this.isFormSubmitted) {
                this.toastr.success("Your information updated successfully!", "", {
                  positionClass: 'toast-center-center',
                  tapToDismiss: true,
                  timeOut: 5000,
                  closeButton: true
                });
              }
            },
            error: this.handlePhotoUploadError.bind(this)
          });
        },
        error: this.handleProfileEditError.bind(this)
      });
    } else {
      this.userService.editProfile(user, password).subscribe({
        next: (data) => {
          if (this.isFormSubmitted) {
            this.toastr.success("Your information updated successfully!","", {
              positionClass: 'toast-center-center',
              tapToDismiss: true,
              timeOut: 5000,
              closeButton: true
            });
          }
        },
        error: this.handleProfileEditError.bind(this)
      });
    }
  }

  private handlePhotoUploadError(err: any) {
    if (err && err.error) {
      const errorMessage = err.error.message;
      if (errorMessage.includes("Unsupported file type")) {
        this.toastr.warning("Unsupported file type. Only JPEG, JPG, and PNG images are allowed.", "Warning", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      } else if (errorMessage.includes("User not found")) {
        this.toastr.warning("User not found. Please provide a valid user.", "Warning", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      } else if (errorMessage.includes("Failed to save the file")) {
        this.toastr.warning("Failed to save the file. Please try again later.", "Warning", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      } else {
        this.toastr.error("An unexpected error occurred. Please try again later.", "Error", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      }
    }
  }

  private handleProfileEditError(err: any) {
    if (err && err.error) {
      const errorMessage = err.error.message;
      if (errorMessage.includes("Equipe not found")) {
        this.toastr.warning("User not found.", "Warning", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      } else {
        this.toastr.error("Error while saving leave. Please try again later.", "Error", {
          positionClass: 'toast-center-center',
          tapToDismiss: true,
          timeOut: 5000
        });
      }
    }
  }

}
