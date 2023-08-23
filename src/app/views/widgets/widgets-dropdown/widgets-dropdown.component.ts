import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {LeavesUserService} from "../../services/leaves-user.service";
import {EquipeService} from "../../services/equipe.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent {

  constructor(private userService: UserService, private leavesUserService: LeavesUserService
    , private equipeService: EquipeService) {
  }

  managers = this.userService.ResponsablesNb();
  employees = this.userService.SalariesNb();
  leavesPending = this.leavesUserService.getNbCongesPending();
  teams = this.equipeService.EquipesNb();
}
