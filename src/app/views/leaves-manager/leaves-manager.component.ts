import {Component, OnInit} from '@angular/core';
import {Conge} from "../model/conge.model";
import {LeavesUserService} from "../services/leaves-user.service";
import {UserService} from "../services/user.service";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import Swal from "sweetalert2";
@Component({
  selector: 'app-leaves-manager',
  templateUrl: './leaves-manager.component.html',
  styleUrls: ['./leaves-manager.component.scss']
})
export class LeavesManagerComponent implements OnInit {
  data!: Conge[];
  rowsPerPage = 7;
  currentPage = 1;
  displayedData: Conge[] = [];
  usersMap: Map<number, User> = new Map<number, User>();
  searchQuery: string = '';

  constructor(private LeavesUserService: LeavesUserService, private userService: UserService) {
  }

  getUser(userId: number): Observable<User> {
    return this.userService.getUtilisateur(userId);
  }

  preloadUsers() {
    this.LeavesUserService.listConge().subscribe(
      data => {
        this.data = data;
        this.generateTable(this.currentPage);
        for (const conge of this.data) {
          this.getUser(conge.utilisateurId).subscribe(
            user => {
              this.usersMap.set(conge.utilisateurId, user);
            },
            error => {
              console.error('Error preloading user data:', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching leaves:', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchConges();
    this.preloadUsers();
  }

  fetchConges() {
    this.LeavesUserService.listConge().subscribe(data => {
      this.data = data;
      this.generateTable(this.currentPage);
    });
  }

  generateTable(page: number): void {
    const startIndex = (page - 1) * this.rowsPerPage;
    const endIndex = Math.min(startIndex + this.rowsPerPage, this.data.length);

    this.displayedData = this.data.filter(conge =>
      this.isCongeMatchingSearch(conge, this.searchQuery)
    ).slice(startIndex, endIndex);
  }

  isCongeMatchingSearch(conge: Conge, query: string): boolean {
    query = query.toLowerCase();
    return (
      conge.id.toString().includes(query) ||
      conge.dateDebut.toString().includes(query) ||
      conge.dateFin.toString().includes(query) ||
      this.getType(conge.type.toString()).toLowerCase().includes(query)||
      conge.motif.toLowerCase().includes(query) ||
      this.usersMap.get(conge.utilisateurId)?.nom.toLowerCase().includes(query) ||
      this.usersMap.get(conge.utilisateurId)?.prenom.toLowerCase().includes(query) ||
      conge.utilisateurId.toString().includes(query)
    );
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    this.generateTable(this.currentPage); // Regenerate the table with the new search query
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.generateTable(this.currentPage);
  }

  generatePaginationButtons(): number[] {
    const totalPages = Math.ceil(this.data.length / this.rowsPerPage);
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  getType(type: string): string {
    switch (type) {
      case 'PAYE':
        return 'Paid';
      case 'MALADIE':
        return 'Illness';
      case 'PARENTAL':
        return 'Parental';
      case 'SPECIAL':
        return 'Special';
      case 'FAMILIAL':
        return 'Family';
      default:
        return type;
    }
  }
  accepterConge(id: number): void {
    this.LeavesUserService.accepterConge(id).subscribe({
      next:() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Leave successfully accepted !",
          showConfirmButton: false,
          timer: 1500
        });
        this.fetchConges();
        this.preloadUsers();
      },
      error: err => {
      if (err && err.error) {
        const errorMessage = err.error.message;
        if (errorMessage.includes("The leave status must be")) {
          Swal.fire('Warning', 'The leave status must be Pending', 'warning');
        } else if (errorMessage.includes("Leave not found")) {
          Swal.fire('Warning', 'Leave not found. Please provide a valid user ID.', 'warning');
       } else {
          Swal.fire('Warning', 'An error occurred while accepting request . Please try again later.', 'warning');
        }
      } else {
        Swal.fire('Warning', 'An unexpected error occurred. Please try again later.', 'warning');
      }
      console.error("Error while accepting request:", err);
    }
  });
  }
  refuserConge(id: number): void {
    this.LeavesUserService.refuserConge(id).subscribe({
      next:() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Leave successfully refused !",
        showConfirmButton: false,
        timer: 1500
      });
        this.fetchConges();
        this.preloadUsers();
    },
      error: err => {
      if (err && err.error) {
        const errorMessage = err.error.message;
        if (errorMessage.includes("The leave status must be")) {
          Swal.fire('Warning', 'The leave status must be Pending', 'warning');
        } else if (errorMessage.includes("Leave not found")) {
          Swal.fire('Warning', 'Leave not found. Please provide a valid user ID.', 'warning');
        } else {
          Swal.fire('Warning', 'An error occurred while accepting request . Please try again later.', 'warning');
        }
      } else {
        Swal.fire('Warning', 'An unexpected error occurred. Please try again later.', 'warning');
      }
      console.error("Error while refusing request:", err);
    }
  });
  }
}
