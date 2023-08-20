import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, switchMap} from "rxjs";
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";

@Component({
  selector: 'app-add-team-pop-up',
  templateUrl: './add-team-pop-up.component.html',
  styleUrls: ['./add-team-pop-up.component.scss']
})
export class AddTeamPopUpComponent implements OnInit{
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>()
  @Output() addTeamEvent = new EventEmitter<Equipe>();
  public equipeForm! : FormGroup;
  public respos! : Array<any>;
  selectedFile!: File ;
  showSuccesAlert : boolean = false;
  title:string="ADD TEAM";
  description : string="The team is created successfully ";

  closeSuccessAlert() {
    this.showSuccesAlert=false;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file "+this.selectedFile);
  }

  constructor(private fb: FormBuilder,private equipeService: EquipeService) {
  }
  ngOnInit() {
    this.equipeService.getUsers() .subscribe({
      next: data => {
        this.respos=data;
        this.respos.forEach(re => {
          console.log("respo : " +re);
        })
      },
      error: err => {
        console.log("err :"+err);
      }
    });
    this.equipeForm=this.fb.nonNullable.group({
      nom:this.fb.nonNullable.control('',
        [Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3)]),
      description:this.fb.nonNullable.control('',[Validators.required,
        Validators.maxLength(600),
        Validators.minLength(3)]),
      image:this.fb.nonNullable.control('',
        [Validators.required,
          Validators.pattern(/.(png|jpe?g)$/i)]),
      responsableId : this.fb.nonNullable.control('',
        Validators.required),
    })
  }
  closePopup() {
    this.closePopupEvent.emit();
  }


  saveEquipe() {
    if (this.equipeForm.valid && this.selectedFile) {
      const equipe: Equipe = this.equipeForm.value;

      this.equipeService.addEquipe(equipe).pipe(
        switchMap((data: Equipe) => {
          console.log('Équipe enregistrée :', data);

          return this.equipeService.uploadTeamPhoto(data.id, this.selectedFile).pipe(
            map((updatedEquipe: Equipe) => {
              console.log('Image de l\'équipe mise à jour :', updatedEquipe);
              this.addTeamEvent.emit(updatedEquipe);
              this.showSuccesAlert=true;
              this.closePopup();
              return updatedEquipe;
            }),
            catchError(error => {
              console.error('Erreur lors de la mise à jour de l\'image de l\'équipe :', error);
              throw error;
            })
          );
        }),
        catchError(err => {
          console.log('Erreur lors de l\'enregistrement de l\'équipe :', err);
          throw err;
        })
      ).subscribe();
    }

  }
}
