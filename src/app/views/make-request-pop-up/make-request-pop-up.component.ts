import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {LeavesUserService} from "../services/leaves-user.service";
import {Conge} from "../model/conge.model";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-make-request-pop-up',
  templateUrl: './make-request-pop-up.component.html',
  styleUrls: ['./make-request-pop-up.component.scss']
})
export class MakeRequestPopUpComponent implements OnInit{
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchLeaves = new EventEmitter<void>();
  newLeaveFormGroup!: FormGroup;
  @Input() id!:number;
  formReady = false;
  selectedPdfFile!: File;
  userId: any;
  closePopup() {
    this.closePopupEvent.emit();
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
    if (localStorage.getItem("id") != undefined) {
      this.userId = localStorage.getItem("id");
    }
    this.newLeaveFormGroup = this.fb.group({
      dateDebut: [null, [Validators.required]],
      dateFin: [null, [Validators.required]],
      motif: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      type: this.fb.control(null, [Validators.required]),
      fichier: this.fb.control(null, [Validators.pattern(/\.(pdf)$/i)]),
    });
    this.newLeaveFormGroup.get('dateDebut')?.setValidators([Validators.required, this.startDateValidator]);
    this.newLeaveFormGroup.get('dateFin')?.setValidators([Validators.required, this.endDateValidator]);
    this.newLeaveFormGroup.updateValueAndValidity();
    this.formReady = true;
  }
  onPdfFileChange(event: any) {
    this.selectedPdfFile = event.target.files[0];
  }
  constructor(private fb: FormBuilder, private LeavesUserService : LeavesUserService,private userService: UserService) {

  }
  showAlert=false;
  closeAlert(){
    this.showAlert=false;
  }
  handleSaveConge() {
    let conge: Conge = this.newLeaveFormGroup?.value;
    conge.utilisateurId = this.userId;
     this.userService.getUtilisateur(conge.utilisateurId).subscribe({
      next: data => {
        const solde = data.solde;

    if (this.selectedPdfFile) {
      this.LeavesUserService.saveConge(conge).subscribe({
        next: data => {
          const congeId = data.id;

          this.LeavesUserService.uploadCongePdf(congeId, this.selectedPdfFile).subscribe({
            next: uploadData => {
              this.newLeaveFormGroup?.reset();
              this.showAlert = true;
              this.closePopup();
              this.fetchLeaves.emit();
            },
            error: uploadError => {
              console.error("Error while uploading PDF:", uploadError);
            }
          });
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
    } else {
      this.LeavesUserService.saveConge(conge).subscribe({
        next: data => {
          this.newLeaveFormGroup?.reset();
          this.showAlert = true;
          this.closePopup();
          this.fetchLeaves.emit();
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
     });
  }


}
