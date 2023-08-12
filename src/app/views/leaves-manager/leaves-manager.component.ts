import { Component } from '@angular/core';

@Component({
  selector: 'app-leaves-manager',
  templateUrl: './leaves-manager.component.html',
  styleUrls: ['./leaves-manager.component.scss']
})
export class LeavesManagerComponent {
  data = [
    {
      profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/1200px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
      name: 'Adam Grant',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: "Paid",

    },
    {
      profileImageUrl: "https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w",
      name: 'John Doe',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: "Paid",

    },
    {
      profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/1200px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
      name: 'Adam Grant',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: "Paid",

    },
    {
      profileImageUrl: "https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w",
      name: 'John Doe',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: "Paid",

    },
    {
      profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/1200px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
      name: 'Adam Grant',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: "Paid",

    },
    {
      profileImageUrl: "https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w",
      name: 'John Doe',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: "Paid",

    },
    {
      profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/1200px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
      name: 'Adam Grant',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: "Paid",

    },
    {
      profileImageUrl: "https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w",
      name: 'John Doe',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: "Paid",

    },
    {
      profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/1200px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
      name: 'Adam Grant',
      startDate: '25-02-2023',
      endDate: '18-05-2023',
      reason: 'I need to take leave due to a family emergency',
      type: "Paid",

    },
    {
      profileImageUrl: "https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w",
      name: 'John Doe',
      startDate: '10-03-2023',
      endDate: '20-03-2023',
      reason: 'Vacation',
      type: "Paid",

    }
  ];
  rowsPerPage = 7;
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
}
