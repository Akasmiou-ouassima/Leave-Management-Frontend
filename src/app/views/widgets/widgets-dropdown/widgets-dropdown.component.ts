import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {LeavesUserService} from "../../services/leaves-user.service";
import {EquipeService} from "../../services/equipe.service";
import {UserService} from "../../services/user.service";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit{
  admin:boolean=false;
  constructor(private userService: UserService, private leavesUserService: LeavesUserService
    , private equipeService: EquipeService,private authService :AuthService) {
    
  }

  ngOnInit(): void {
    this.admin=this.authService.isAdmin();
    }

  managers = this.userService.ResponsablesNb();
  employees = this.userService.SalariesNb();
  leavesPending = this.leavesUserService.getNbCongesPending();
  teams = this.equipeService.EquipesNb();

  leaves = this.leavesUserService.getNbCongesByUser(this.authService.tokens.id);
  acceptedLeaves = this.leavesUserService.getNbCongesByUserByEtat(this.authService.tokens.id,"ACCEPTE");
  leavesPending1 = this.leavesUserService.getNbCongesByUserByEtat(this.authService.tokens.id,"EN_ATTENTE");
  refusedLeaves = this.leavesUserService.getNbCongesByUserByEtat(this.authService.tokens.id,"REFUSE");

}
