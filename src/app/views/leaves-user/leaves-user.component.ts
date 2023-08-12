import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-leaves-user',
  templateUrl: './leaves-user.component.html',
  styleUrls: ['./leaves-user.component.scss']
})
export class LeavesUserComponent {
  isPopupOpen = false;
  closePopup() {
    this.isPopupOpen = false;
  }

  isPopupOpen1 = false;
  closePopup1() {
    this.isPopupOpen1 = false;
  }

  data = [
    {
      status: 'Rejected',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: 'Paid',
    },
    {
      status: 'Accepted',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: 'Paid',
    },
    {
      status: 'Pending',
      startDate: '15-03-2023',
      endDate: '25-03-2023',
      reason: 'Medical Leave',
      type: 'Medical',
    },
    {
      status: 'Rejected',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: 'Paid',
    },
    {
      status: 'Accepted',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: 'Paid',
    },
    {
      status: 'Pending',
      startDate: '15-03-2023',
      endDate: '25-03-2023',
      reason: 'Medical Leave',
      type: 'Medical',
    },
    {
      status: 'Rejected',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: 'Paid',
    },
    {
      status: 'Accepted',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: 'Paid',
    },
    {
      status: 'Pending',
      startDate: '15-03-2023',
      endDate: '25-03-2023',
      reason: 'Medical Leave',
      type: 'Medical',
    },
  ];
  rowsPerPage = 6;
  currentPage = 1;
  displayedData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateTable(this.currentPage);
  }

  generateTable(page: number): void {
    const startIndex = (page - 1) * this.rowsPerPage;
    const endIndex = Math.min(startIndex + this.rowsPerPage, this.data.length);
    this.displayedData = this.data.slice(startIndex, endIndex);
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
      case 'Accepted':
        return 'status-accepted';
      case 'Rejected':
        return 'status-rejected';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  }

}
