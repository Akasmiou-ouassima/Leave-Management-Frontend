import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent{
  displayedColumns = ['id', 'name', 'email', 'role', 'type', 'phone', 'balance', 'status', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ShowPopup = false;
  closePopup() {
    this.ShowPopup = false;
  }

  showPopup = false;
  closePopup1() {
    this.showPopup = false;
  }
}
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const randomStatus = Math.random() < 0.5 ? 'Active' : 'Disable';
  const randomType = Math.random() < 0.5 ? 'Employee' : 'Manager';

  return {
    id:id,
    name: name,
    email: 'email@gmail.com',
    role: 'Designer',
    type: randomType,
    phone: '092378948',
    balance: 18,
    status: randomStatus,
    action: 'action'
  };
}

const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  type: string;
  phone: string;
  balance: number;
  status:string;
  action:string;
}

