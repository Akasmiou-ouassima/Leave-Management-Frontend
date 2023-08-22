import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {LeavesUserService} from "../services/leaves-user.service";
import {Conge} from "../model/conge.model";

@Component({
  selector: 'app-make-request-pop-up',
  templateUrl: './make-request-pop-up.component.html',
  styleUrls: ['./make-request-pop-up.component.scss']
})
export class MakeRequestPopUpComponent {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchLeaves = new EventEmitter<void>();
  newLeaveFormGroup!: FormGroup;
  @Input() id!:number;
  formReady = false;
  selectedPdfFileName: string = '';

  closePopup() {
    this.closePopupEvent.emit();
  }

  startDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.value;
    const today = new Date();

    if (startDate && startDate <= today) {
      return { startDatePast: true };
    }

    return null;
  }

  endDateValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!this.newLeaveFormGroup) {
      return null;
    }

    const endDate = control.value;
    const startDateControl = this.newLeaveFormGroup.get('dateDebut');

    if (startDateControl) {
      const startDate = startDateControl.value;

      if (endDate && startDate && endDate <= startDate) {
        return { endDateBeforeStart: true };
      }
    }

    return null;
  }

  ngOnInit(): void {
    this.newLeaveFormGroup = this.fb.group({
      dateDebut: [null, [Validators.required, this.startDateValidator]],
      dateFin: [null, [Validators.required]],
      motif: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      type: this.fb.control(null, [Validators.required]),
      fichier: this.fb.control(null, [Validators.pattern(/\.(pdf)$/i)]),
    });
    this.newLeaveFormGroup.get('dateFin')?.setValidators([Validators.required, this.endDateValidator]);
    this.newLeaveFormGroup.updateValueAndValidity();
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
  constructor(private fb: FormBuilder, private LeavesUserService : LeavesUserService) {

  }
  showAlert=false;
  closeAlert(){
    this.showAlert=false;
  }
  handleSaveConge() {
    let conge: Conge = this.newLeaveFormGroup?.value;
    conge.utilisateurId = 2;
    this.LeavesUserService.saveConge(conge).subscribe({
      next: data => {
        this.newLeaveFormGroup?.reset();
        this.showAlert=true;
        this.closePopup();
        this.fetchLeaves.emit();
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
          } else if (errorMessage.includes("Conge already exists")) {
            this.closePopup();
            Swal.fire('Error', 'Leave request already exists for the specified dates.', 'error');
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

}
