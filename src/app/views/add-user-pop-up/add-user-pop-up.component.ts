import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {Observable, throwError} from "rxjs";
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-user-pop-up',
  templateUrl: './add-user-pop-up.component.html',
  styleUrls: ['./add-user-pop-up.component.scss']
})
export class AddUserPopUpComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchUsers = new EventEmitter<void>();
  newUserFormGroup!: FormGroup;
  errorMessage!: string;
  equipes$! : Observable<any[]>;
  equipesList: any[] = [];
  selectedFile!: File;
  closePopup() {
    this.closePopupEvent.emit();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.equipes$=this.userService.listEquipe();
    this.newUserFormGroup = this.fb.group({
      prenom : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      nom : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      poste : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      tel : this.fb.control(null, [Validators.required, Validators.maxLength(10)]),
      email : this.fb.control(null, [Validators.required,  Validators.required]),
      adresse : this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      equipeId : this.fb.control(null, [Validators.required]),
      image : this.fb.control(null, [Validators.required, Validators.pattern(/\.(png|jpe?g)$/i)]),
    });
    this.equipes$.subscribe((equipes: any[]) => {
      this.equipesList = equipes;
    });
  }

  handleSaveNewUser() {
    if (this.newUserFormGroup.valid && this.selectedFile) {
      let user: User = this.newUserFormGroup?.value;

      this.userService.saveUtilisateur(user).subscribe({
        next: data => {
          const userId = data.id;

          this.userService.uploadUserPhoto(userId, this.selectedFile).subscribe({
            next: uploadData => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: "New User has been successfully saved!",
                showConfirmButton: false,
                timer: 1500
              });
              this.newUserFormGroup?.reset();
              this.fetchUsers.emit();
              this.closePopup();
            },
            error: uploadError => {
              this.errorMessage = uploadError.message;
              return throwError(uploadError);
            }
          });
        },
        error: err => {
          if (err && err.error) {
            const errorMessage = err.error.message;
            if (errorMessage.includes("Equipe not found")) {
              this.closePopup();
              Swal.fire('Error', 'Team not found. Please provide a valid team ID.', 'error');
            } else if (errorMessage.includes("Utilisateur already exists")) {
              this.closePopup();
              Swal.fire('Error', 'Email already exists. Please provide a new email.', 'error');
            } else {
              this.closePopup();
              Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
            }
            console.error("Error while saving user:", err);
          }
        }
      });
    }
  }


}
