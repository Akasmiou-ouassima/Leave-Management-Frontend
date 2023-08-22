import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, of, switchMap} from "rxjs";
@Component({
  selector: 'app-update-team-pop-up',
  templateUrl: './update-team-pop-up.component.html',
  styleUrls: ['./update-team-pop-up.component.scss']
})
export class UpdateTeamPopUpComponent{
  @Input() isModalOpen=false;
  @Output() closePopupEvent=new EventEmitter<void>();
  @Input()  teamUpdated! : Equipe;
  @Output() updateTeamEvent = new EventEmitter<Equipe>();
  public equipeForm! : FormGroup;
  public respos! : Array<any>;
  selectedFile!: File ;
  showSuccesAlert : boolean = false;
  title:string="UPDATE TEAM";
  description : string="The team is updated successfully ";
  closeSuccessAlert() {
    this.showSuccesAlert=false;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file "+this.selectedFile);
  }

  constructor(private fb: FormBuilder,private equipeService: EquipeService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("loading respos ...");
    this.equipeService.getUsersWithoutMembers(this.teamUpdated?.id)
      .subscribe({

        next: data => {
          this.respos=data;
          this.respos.forEach(re => {
            console.log("respo : " +re.id);
          })
        },
        error: err => {
          console.log("err :"+err);
        }
      });
    if (this.isModalOpen === true) {
      console.log('isModalOpen changed to true!');
      this.equipeForm=this.fb.nonNullable.group({
        id:this.fb.nonNullable.control(this.teamUpdated?.id),
        nom:this.fb.nonNullable.control(this.teamUpdated?.nom,
          [Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3)]),
        description:this.fb.nonNullable.control(this.teamUpdated?.description,[Validators.required,
          Validators.maxLength(600),
          Validators.minLength(3)]),
        image:this.fb.nonNullable.control(this.teamUpdated?.image,
          [Validators.required,
            Validators.pattern(/.(png|jpe?g)$/i)]),
        responsableId : this.fb.nonNullable.control(this.teamUpdated?.responsableId,
          Validators.required),
      })
    }
  }
  closePopup() {
    this.closePopupEvent.emit();
  }
  updateEquipe() {
    if (this.equipeForm.valid) {
      const equipe: Equipe = this.equipeForm.value;

      this.equipeService.updateEquipe(equipe).pipe(
        switchMap((data: Equipe) => {
          this.teamUpdated=data;
          console.log('Équipe modifiée :', data);
          this.updateTeamEvent.emit(data);
          this.showSuccesAlert = true;
          this.closePopup();
          if (this.selectedFile) {
            return this.equipeService.uploadTeamPhoto(data.id, this.selectedFile).pipe(
              map((updatedEquipe: Equipe) => {
                console.log('Image de l\'équipe mise à jour :', updatedEquipe);
                this.teamUpdated=updatedEquipe;
                return updatedEquipe;
              }),
              catchError(error => {
                console.error('Erreur lors de la mise à jour de l\'image de l\'équipe :', error);
                throw error;
              })
            );
          } else {
            return of(null); // Renvoyer un observable vide
          }
        }),
        catchError(err => {
          console.log('Erreur lors de l\'enregistrement de l\'équipe :', err);
          throw err;
        })
      ).subscribe();

    }

  }
}
