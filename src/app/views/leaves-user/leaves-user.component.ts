import {Component,OnInit} from '@angular/core';
import {Conge, Etat} from "../model/conge.model";
import {LeavesUserService} from "../services/leaves-user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-leaves-user',
  templateUrl: './leaves-user.component.html',
  styleUrls: ['./leaves-user.component.scss']
})
export class LeavesUserComponent implements OnInit{
  data!:Conge[];
  rowsPerPage = 6;
  currentPage = 1;
  displayedData: Conge[] = [];
  searchQuery: string = '';
  isPopupOpen = false;
  userId: any;
  
  closePopup() {
    this.isPopupOpen = false;
  }

  isPopupOpen1 = false;
  closePopup1() {
    this.isPopupOpen1 = false;

  }
  constructor(private LeavesUserService : LeavesUserService) { }

  getConges(){
    this.LeavesUserService.getCongesByUtilisateur(this.userId).subscribe(data => {
      this.data = data;
      this.generateTable(this.currentPage);
    });
  }
  showAlert = false;
  check=0;
  closeAlert(){
    this.showAlert=false;
  }
  deleteConge(congeId: number) {
    this.LeavesUserService.getCongeById(congeId).subscribe(
      conge1 => {
        const conge = conge1;
        const currentDate = new Date();
        const startDate = new Date(conge.dateDebut);

        if (startDate <= currentDate && conge.etat !== Etat.EN_ATTENTE) {
          this.showAlert = true;
          this.check = 1;
        } else if (conge.etat === Etat.REFUSE) {
          this.showAlert = true;
          this.check = 2;
        } else {
          Swal.fire({
            title: 'Are you sure to delete this leave?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.LeavesUserService.deleteConge(congeId).subscribe(
                () => {
                  Swal.fire(
                    'Deleted!',
                    'Deleted successfully!',
                    'success'
                  );
                  this.getConges();
                },
                error => {
                  console.error('Error deleting leave:', error);
                }
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Cancelled successfully :)',
                'error'
              );
            }
          });
        }
      },
      error => {
        console.error('Error getting leave details:', error);
      }
    );
  }


  ngOnInit(): void {
    if (localStorage.getItem("id") != undefined) {
      this.userId = localStorage.getItem("id");
    }
    this.getConges();
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
      this.getStatus(conge.etat.toString()).toLowerCase().includes(query)||
      conge.motif.toLowerCase().includes(query)
    );
  }
  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    this.generateTable(this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.generateTable(this.currentPage);
  }

  generatePaginationButtons(): number[] {
    const totalPages = Math.ceil(this.data.length / this.rowsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTE':
        return 'status-accepted';
      case 'REFUSE':
        return 'status-rejected';
      case 'EN_ATTENTE':
        return 'status-pending';
      default:
        return '';
    }
  }


  getStatus(status: string): string {
    switch (status) {
      case 'ACCEPTE':
        return 'Accepted';
      case 'REFUSE':
        return 'Rejected';
      case 'EN_ATTENTE':
        return 'Pending';
      default:
        return '';
    }
  }

  getType(type : string):string{
    switch (type){
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
  selectedLeave!: Conge;
  showModal=false;
  openUpdateModal(conge: Conge) {
    this.selectedLeave = { ...conge };
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
