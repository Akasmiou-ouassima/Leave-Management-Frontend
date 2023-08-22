import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../model/user.model";
import {UserService} from "../services/user.service";
import { MatSort } from '@angular/material/sort';
import Swal from "sweetalert2";




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'poste', 'type', 'tel', 'solde', 'status', 'action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  users: User[] = [];

  constructor(private userService: UserService) {}

  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.userService.listUtilisateurs().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  handleDeleteUser(user: User): void {
    document.body.classList.add('swal-open-font-change');
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    })
    if (user.type === 'RESPONSABLE') {
      Swal.fire({
        title: 'Warning!',
        text: 'Removing a team leader is not allowed. Please assign a new leader before proceeding with the deletion.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user);
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure to delete this user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user);
        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Cancelled successfully :)',
            'error'
          )
        }
      });
    }
  }

  deleteUser(user: User): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    this.userService.deleteUtilisateur(user.id).subscribe(
      () => {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Deleted successfully!',
          'success'
        )
        this.fetchUsers();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  searchUsers(keyword: string) {
    this.userService.searchUtilisateurs(keyword).subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }
  onSearch(event: any) {
    const keyword = event.target.value;
    this.searchUsers(keyword);
  }
  ShowPopup = false;
  closePopup() {
    this.ShowPopup = false;
  }

  selectedUser!: User;
  showPopup=false;
  openUpdatePopup(user: User) {
    this.selectedUser = { ...user };
    this.showPopup = true;
  }
  closePopup1() {
    this.showPopup = false;
  }

}
