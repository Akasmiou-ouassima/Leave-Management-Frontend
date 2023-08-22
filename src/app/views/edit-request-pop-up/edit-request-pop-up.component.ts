import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {LeavesUserService} from "../services/leaves-user.service";
import {Conge} from "../model/conge.model";


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
  selectedPdfFileName: string = '';
  leaveId!: number;

  constructor(private fb: FormBuilder, private LeavesUserService: LeavesUserService, private route: ActivatedRoute) {
  }

  closePopup() {
    this.closeModalEvent.emit();
    this.updateLeaveFormGroup?.reset();
  }


  ngOnInit(): void {
    this.leaveId = this.route.snapshot.params['id'];
    this.updateLeaveFormGroup = this.fb.group({
      id: this.fb.control(this.selectedLeave?.id || '', [Validators.required, Validators.minLength(1)]),
      etat: this.fb.control(this.selectedLeave?.etat || '', [Validators.required]),
      dateDebut: [this.selectedLeave?.dateDebut, [Validators.required, this.startDateValidator]],
      dateFin: [this.selectedLeave?.dateFin, [Validators.required]],
      motif: this.fb.control(this.selectedLeave?.motif, [Validators.required, Validators.minLength(3)]),
      type: this.fb.control(this.selectedLeave?.type, [Validators.required]),
      fichier: this.fb.control(this.selectedLeave?.fichier, [Validators.pattern(/\.(pdf)$/i)]),
    });
    this.updateLeaveFormGroup.get('dateFin')?.setValidators([this.endDateValidator]);
    this.updateLeaveFormGroup.updateValueAndValidity();
    this.formReady = true;
  }

  onPdfFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedPdfFileName = inputElement.files[0].name;
    } else {
      this.selectedPdfFileName = '';
    }
  }

  startDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.value;
    const today = new Date();
    if (startDate && startDate <= today) {
      return {startDatePast: true};
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
        return {endDateBeforeStart: true};
      }
    }
    return null;
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.updateLeaveFormGroup?.reset();
  }

  handleUpdateLeave() {
    let conge: Conge = this.updateLeaveFormGroup?.value;
    conge.utilisateurId = 2;

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
        this.LeavesUserService.updateConge(conge).subscribe({
          next: (res) => {
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
                Swal.fire('Error', 'Insufficient leave balance. Please check your available leave days.', 'error');
              } else if (errorMessage.includes("Utilisateur not found")) {
                this.closePopup();
                Swal.fire('Error', 'User not found. Please provide a valid user ID.', 'error');
              } else if (errorMessage.includes("Leave not found")) {
                this.closePopup();
                Swal.fire('Error', 'Leave not found. Please provide a valid leave ID.', 'error');
              } else if (errorMessage.includes("The leave status must be")) {
                this.closePopup();
                Swal.fire('Error', 'The leave status must be \'Pending\'.', 'error');
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
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }


}
