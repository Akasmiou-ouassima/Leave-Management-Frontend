import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {catchError, map, Observable, switchMap} from "rxjs";
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-team-pop-up',
  templateUrl: './add-team-pop-up.component.html',
  styleUrls: ['./add-team-pop-up.component.scss']
})
export class AddTeamPopUpComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>()
  @Output() addTeamEvent = new EventEmitter<Equipe>();
  public equipeForm!: FormGroup;
  public respos!: Array<any>;
  selectedFile!: File;
  showSuccesAlert: boolean = false;
  check = 1;

  closeSuccessAlert() {
    this.showSuccesAlert = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file " + this.selectedFile.name);
  }

  constructor(private fb: FormBuilder, private equipeService: EquipeService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.equipeService.getUsers().subscribe({
      next: data => {
        this.respos = data.filter(user => user.id != 1);
      },
      error: err => {
        console.log("err :" + err);
      }
    });
    this.equipeForm = this.fb.nonNullable.group({
      nom: this.fb.nonNullable.control(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      description: this.fb.nonNullable.control(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      image: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/.(png|jpe?g)$/i)]),
      responsableId: this.fb.nonNullable.control('', Validators.required),
    })
  }

  closePopup() {
    this.closePopupEvent.emit();
    this.equipeForm.reset();
  }


  saveEquipe() {
    if (this.equipeForm.valid && this.selectedFile) {
      const equipe: Equipe = this.equipeForm.value;

      this.equipeService.addEquipe(equipe).pipe(
        switchMap((data: Equipe) => {
          return this.equipeService.uploadTeamPhoto(data.id, this.selectedFile).pipe(
            map((updatedEquipe: Equipe) => {
              this.showSuccesAlert = true;
              this.equipeForm.reset();
              this.closePopup();
              console.log('Image de l\'équipe mise à jour :', updatedEquipe);
              this.addTeamEvent.emit(updatedEquipe);
              return updatedEquipe;
            }),
            catchError(error => {
              console.error('Erreur lors de la mise à jour de l\'image de l\'équipe :', error);
              throw error;
            })
          );
        }),
        catchError(err => {
          const errorMessage = err.error.message;
          if (errorMessage.includes("Team already exists")) {
            this.closePopup();
            Swal.fire('Error', 'Team already exists. Please provide another name', 'error');
            throw err;
          } else {
            this.closePopup();
            Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
            throw err;
          }
        })
      ).subscribe();
    }

  }
}
