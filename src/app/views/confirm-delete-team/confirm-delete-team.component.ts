import {animate, state, style, transition, trigger } from '@angular/animations';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Equipe} from "../model/equipe.model";
import {EquipeService} from "../services/equipe.service";

@Component({
  selector: 'app-confirm-delete-team',
  templateUrl: './confirm-delete-team.component.html',
  styleUrls: ['./confirm-delete-team.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(-30px)' })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class ConfirmDeleteTeamComponent {
  @Input() showAlert = false;
  @Input() teamDeleted !: Equipe;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<Equipe>();
  check = 3;
  showSuccesAlert: boolean = false;

  closeSuccessAlert() {
    this.showSuccesAlert = false;
  }

  constructor(private equipeService: EquipeService) {
  }

  closeAlert() {
    this.closePopupEvent.emit();
  }

  delete(equipe: Equipe) {
    this.equipeService.deleteEquipe(equipe.id).subscribe(result => {
      if (result) {
        console.log('Équipe supprimée avec succès.');
        this.deleteEvent.emit(equipe);
        this.closePopupEvent.emit();
        this.showSuccesAlert = true;
      } else {
        console.log("La suppression de l'équipe a échoué.");
        this.closePopupEvent.emit();
        this.showPopupError = true;
      }
    });
  }

  // error
  showPopupError = false;

  closePopupError() {
    this.showPopupError = false;
  }
}
