import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {Observable, throwError} from "rxjs";
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-user-pop-up',
  templateUrl: './add-user-pop-up.component.html',
  styleUrls: ['./add-user-pop-up.component.scss']
})
export class AddUserPopUpComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchUsers = new EventEmitter<void>();
  newUserFormGroup!: FormGroup;
  errorMessage!: string;
  equipes$! : Observable<any[]>;
  equipesList: any[] = [];

  closePopup() {
    this.closePopupEvent.emit();
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.equipes$=this.userService.listEquipe();
    this.newUserFormGroup = this.fb.group({
      prenom : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      nom : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      poste : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      tel : this.fb.control(null, [Validators.required, Validators.maxLength(10)]),
      email : this.fb.control(null, [Validators.required,  Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      adresse : this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      equipeId : this.fb.control('Select a team...', [Validators.required]),
      image : this.fb.control(null, [Validators.required, Validators.pattern(/\.(png|jpe?g)$/i)]),
    });
    this.equipes$.subscribe((equipes: any[]) => {
      this.equipesList = equipes;
    });
  }

  handleSaveNewUser() {
    let user: User = this.newUserFormGroup?.value;
    this.userService.saveUtilisateur(user).subscribe({
      next: data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "New User has been successfully saved!",
          showConfirmButton: false,
          timer: 1500
        });
        this.newUserFormGroup?.reset();
        this.fetchUsers.emit();
        this.closePopup();
      },
      error: err => {
        this.errorMessage = err.message;
        return throwError(err);
      }
    });
  }

}
