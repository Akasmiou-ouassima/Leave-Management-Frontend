import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {LeavesUserService} from "../services/leaves-user.service";
import {Conge} from "../model/conge.model";
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-edit-request-pop-up',
  templateUrl: './edit-request-pop-up.component.html',
  styleUrls: ['./edit-request-pop-up.component.scss']
})
export class EditRequestPopUpComponent {
  @Input() isModalOpen = false;
  @Input() selectedLeave!: Conge;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() fetchLeaves = new EventEmitter<void>();
  updateLeaveFormGroup!: FormGroup;
  formReady = false;
  selectedPdfFile!: File;
  leaveId!: number;
  userId: any;
  constructor(private fb: FormBuilder, private LeavesUserService: LeavesUserService, private route: ActivatedRoute
  ,private userService:UserService) {
  }

  closePopup() {
    this.closeModalEvent.emit();
    this.updateLeaveFormGroup?.reset();
  }


  ngOnInit(): void {
    if (localStorage.getItem("id") != undefined) {
      this.userId = localStorage.getItem("id");
    }
    this.leaveId = this.route.snapshot.params['id'];
    this.updateLeaveFormGroup = this.fb.group({
      id: this.fb.control(this.selectedLeave?.id || '', [Validators.required, Validators.minLength(1)]),
      etat: this.fb.control(this.selectedLeave?.etat || '', [Validators.required]),
      dateDebut: [this.selectedLeave?.dateDebut, [Validators.required]],
      dateFin: [this.selectedLeave?.dateFin, [Validators.required]],
      motif: this.fb.control(this.selectedLeave?.motif, [Validators.required, Validators.minLength(3)]),
      type: this.fb.control(this.selectedLeave?.type, [Validators.required]),
      fichier: this.fb.control(this.selectedLeave?.fichier, [Validators.pattern(/\.(pdf)$/i)]),
    });
    this.updateLeaveFormGroup.get('dateDebut')?.setValidators([Validators.required, this.startDateValidator]);
    this.updateLeaveFormGroup.get('dateFin')?.setValidators([Validators.required, this.endDateValidator]);
    this.updateLeaveFormGroup.updateValueAndValidity();
    this.formReady = true;
  }

  onPdfFileChange(event: any) {
    this.selectedPdfFile = event.target.files[0];
  }

  startDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const startDate = new Date(control.value);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (startDate <= today) {
      return { startDatePast: true };
    }
    return null;
  }
  endDateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!this.updateLeaveFormGroup) {
      return null;
    }

    const endDate = control.value;
    const startDateControl = this.updateLeaveFormGroup.get('dateDebut');

    if (startDateControl) {
      const startDate = startDateControl.value;

      if (endDate && startDate && endDate <= startDate) {
        return { endDateBeforeStart: true };
      }
    }

    return null;
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.updateLeaveFormGroup?.reset();
  }

  handleUpdateLeave() {
    const conge: Conge = this.updateLeaveFormGroup?.value;
    conge.utilisateurId = this.userId;

    this.userService.getUtilisateur(conge.utilisateurId).subscribe({
      next: userData => {
        const solde = userData.solde;

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
            if (this.selectedPdfFile) {
              this.LeavesUserService.updateConge(conge).subscribe({
                next: updateData => {
                  const congeId = updateData.id;

                  this.LeavesUserService.uploadCongePdf(congeId, this.selectedPdfFile).subscribe({
                    next: uploadData => {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Leave information updated successfully!',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.updateLeaveFormGroup?.reset();
                      this.fetchLeaves.emit();
                      this.closeModal();
                    },
                    error: uploadError => {
                      console.error("Error while uploading PDF:", uploadError);
                    }
                  });
                },
                error: updateError => {
                  if (updateError && updateError.error) {
                    const errorMessage = updateError.error.message;
                    if (errorMessage.includes("Solde insuffisant")) {
                      this.closePopup();
                      Swal.fire('Error', `Insufficient leave balance. Your available leave days: ${solde}`, 'error');
                    } else if (errorMessage.includes("Utilisateur not found")) {
                      this.closePopup();
                      Swal.fire('Error', 'User not found. Please provide a valid user ID.', 'error');
                    } else if (errorMessage.includes("Leave not found")) {
                      this.closePopup();
                      Swal.fire('Error', 'Leave not found. Please provide a valid leave ID.', 'error');
                    } else if (errorMessage.includes("The leave status must be Pending")) {
                      this.closePopup();
                      Swal.fire('Error', 'The leave status must be in the Pending state.', 'error');
                    } else {
                      this.closePopup();
                      Swal.fire('Error', 'An error occurred while saving the leave request. Please try again later.', 'error');
                    }
                  } else {
                    this.closePopup();
                    Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
                  }
                  console.error("Error while saving leave:", updateError);
                }
              });
            }
          else {
            this.LeavesUserService.updateConge(conge).subscribe({
              next: data => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Leave information updated successfully!',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.updateLeaveFormGroup?.reset();
                this.fetchLeaves.emit();
                this.closeModal();
              },
              error: err => {
                if (err && err.error) {
                  const errorMessage = err.error.message;
                  if (errorMessage.includes("Solde insuffisant")) {
                    this.closePopup();
                    Swal.fire('Error', `Insufficient leave balance. Your available leave days: ${solde}`, 'error');
                  } else if (errorMessage.includes("Utilisateur not found")) {
                    this.closePopup();
                    Swal.fire('Error', 'User not found. Please provide a valid user ID.', 'error');
                  } else if (errorMessage.includes("Conge already exists")) {
                    this.closePopup();
                    Swal.fire('Error', 'Leave already exists. Please make new leave with a new start date and end date', 'error');
                  } else if (errorMessage.includes("The leave status must be Pending")) {
                    this.closePopup();
                    Swal.fire('Error', 'The leave status must be in the Pending state.', 'error');
                  } else {
                    this.closePopup();
                    Swal.fire('Error', 'An error occurred while saving the leave request. Please try again later.', 'error');
                  }
                } else {
                  this.closePopup();
                  Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
                }
                console.error("Error while saving leave:", err);
              }
            });
          }
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      },
      error: userError => {
        console.error("Error while getting user data:", userError);
      }
    });
  }
}
