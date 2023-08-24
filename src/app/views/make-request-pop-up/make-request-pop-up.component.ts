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
  selectedPdfFile!: File;

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

    if (startDate < today) {
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
  constructor(private fb: FormBuilder, private LeavesUserService : LeavesUserService) {

  }
  showAlert=false;
  closeAlert(){
    this.showAlert=false;
  }
  handleSaveConge() {
    let conge: Conge = this.newLeaveFormGroup?.value;
    conge.utilisateurId = 2;

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
          console.error("Error while saving leave:", err);
        }
      });
    }
  }


}
