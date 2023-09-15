import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import Swal from "sweetalert2";
import {Observable, throwError} from "rxjs";
import {EquipeService} from "../services/equipe.service";

@Component({
  selector: 'app-update-user-pop-up',
  templateUrl: './update-user-pop-up.component.html',
  styleUrls: ['./update-user-pop-up.component.scss']
})
export class UpdateUserPopUpComponent implements OnInit{
  @Input() isModalOpen = false;
  @Input() selectedUser!: User;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchUsers = new EventEmitter<void>();
  updateFormGroup: FormGroup | undefined;
  userId!: number;
  user!: User;
  equipes$!: Observable<any[]>;
  equipesList: any[] = [];
  selectedFile!: File;
  users: User[] = [];
  closePopup1() {
    this.closePopupEvent.emit();
    this.updateFormGroup?.reset();

  }

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
  ) {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.updateFormGroup = this.fb.group({
      id: this.fb.control(this.selectedUser?.id || '', [Validators.required, Validators.minLength(1)]),
      solde: this.fb.control(this.selectedUser?.solde || '', [Validators.required]),
      type: this.fb.control(this.selectedUser?.type || '', [Validators.required]),
      prenom: this.fb.control(this.selectedUser?.prenom || '', [Validators.required, Validators.minLength(3)]),
      nom: this.fb.control(this.selectedUser?.nom || '', [Validators.required, Validators.minLength(3)]),
      poste: this.fb.control(this.selectedUser?.poste || '', [Validators.required, Validators.minLength(3)]),
      tel: this.fb.control(this.selectedUser?.tel || '', [Validators.required, Validators.maxLength(20)]),
      email: this.fb.control(this.selectedUser?.email || '', [Validators.required, Validators.email]),
      adresse: this.fb.control(this.selectedUser?.adresse || '', [Validators.required, Validators.minLength(5)]),
      status: this.fb.control(this.selectedUser?.status || '', [Validators.required]),
      image: this.fb.control(this.selectedUser?.image || '', [Validators.pattern(/\.(png|jpe?g)$/i)]),
      equipeId: this.fb.control(this.selectedUser?.equipeId || '', [Validators.required]),
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.equipes$ = this.userService.listEquipesWithoutMyEquipes(this.selectedUser?.id);
    this.equipes$.subscribe((equipes: any[]) => {
      this.equipesList = equipes;
    });
  }


  handleUpdateUser() {
    let user: User = this.updateFormGroup?.value;

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUtilisateur(user).subscribe({
          next: (updatedRes) => {
            const userId = updatedRes.id;

            if (this.selectedFile) {
              this.userService.uploadUserPhoto(userId, this.selectedFile).subscribe({
                next: uploadData => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User information updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.updateFormGroup?.reset();
                  this.fetchUsers.emit();
                  this.closePopup1();
                },
                error: (uploadErr) => {
                  console.log(uploadErr);
                  return throwError(uploadErr);
                }
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User information updated successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.updateFormGroup?.reset();
              this.fetchUsers.emit();
              this.closePopup1();
            }
          },
          error: err => {
            if (err && err.error) {
              const errorMessage = err.error.message;
              if (errorMessage.includes("Equipe not found")) {
                this.closePopup1();
                Swal.fire('Error', 'Team not found. Please provide a valid team ID.', 'error');
              } else if (errorMessage.includes("email already exists")) {
                this.closePopup1();
                Swal.fire('Error', 'Email already exists. Please provide a new email.', 'error');
              } else {
                this.closePopup1();
                Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
              }
              console.error("Error while updating user:", err);
            }
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
