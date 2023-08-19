import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import Swal from "sweetalert2";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-user-pop-up',
  templateUrl: './update-user-pop-up.component.html',
  styleUrls: ['./update-user-pop-up.component.scss']
})
export class UpdateUserPopUpComponent implements OnInit{
  @Input() isModalOpen = false;
  @Input() selectedUser!: User;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() fetchUsers = new EventEmitter<void>();
  updateFormGroup: FormGroup | undefined;
  userId!: number;
  user!: User;
  equipes$! : Observable<any[]>;
  equipesList: any[] = [];
  closePopup1() {
    this.closePopupEvent.emit();

  }
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) {

  }
  ngOnInit(): void {
    this.equipes$=this.userService.listEquipe();
    this.userId = this.route.snapshot.params['id'];
    this.updateFormGroup = this.fb.group({
      id : this.fb.control(this.selectedUser?.id || '', [Validators.required, Validators.minLength(1)]),
      solde : this.fb.control(this.selectedUser?.solde || '',[Validators.required]),
      type : this.fb.control(this.selectedUser?.type || '',[Validators.required]),
      prenom : this.fb.control(this.selectedUser?.prenom || '',[Validators.required, Validators.minLength(3)]),
      nom : this.fb.control(this.selectedUser?.nom || '',[Validators.required, Validators.minLength(3)]),
      poste : this.fb.control(this.selectedUser?.poste || '',[Validators.required, Validators.minLength(3)]),
      tel : this.fb.control(this.selectedUser?.tel || '',[Validators.required, Validators.maxLength(10)]),
      email : this.fb.control(this.selectedUser?.email || '',[Validators.required, Validators.email]),
      adresse : this.fb.control(this.selectedUser?.adresse || '',[Validators.required, Validators.minLength(5)]),
      equipeId : this.fb.control(this.selectedUser?.equipeId || '',[Validators.required]),
      image : this.fb.control(this.selectedUser?.image || '',[Validators.required, Validators.pattern(/\.(png|jpe?g)$/i)]),
      status: this.fb.control(this.selectedUser?.status,[Validators.required])
    });

    this.equipes$.subscribe((equipes: any[]) => {
      this.equipesList = equipes;
    });
  }
  users: User[] = [];


  handleUpdateUser() {
    let user: User = this.updateFormGroup?.value;
    this.userService.updateUtilisateur(user).subscribe({
      next: (res) => {
          Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User information updated successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.updateFormGroup?.reset();
              this.fetchUsers.emit();
              this.closePopup1();
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info');
            }
          });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  }
