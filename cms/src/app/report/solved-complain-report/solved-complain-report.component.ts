import { Component, OnInit } from '@angular/core';
import { AllServiceService } from 'src/app/Services/all-service.service';

@Component({
  selector: 'app-solved-complain-report',
  templateUrl: './solved-complain-report.component.html',
  styleUrls: ['./solved-complain-report.component.css']
})
export class SolvedComplainReportComponent implements OnInit{
  ngOnInit(): void {
    this.getSolvedComplaints()
  }
  searchSolved:any
  userData:any;
  constructor(private service:AllServiceService){
    this.userData=this.service.getUserSessionData()
    
    // console.log(this.service.getUserSessionData().OrganizationId);
    // console.log(this.userData);
    
    
    
  }
  solvedComplaints:any[]=[];
  getSolvedComplaints(){
    this.service.get_solved_complaints(this.userData?.departmentId,this.userData.OrganizationId).subscribe((res:any)=>{
      // console.log(res);
      this.solvedComplaints=res[0];
      
    },(err:any)=>{
      console.log(err);
      
    })
  }


  PrintsolvedReport(){
    window.print();
  }


  
  csvColumns: string[] = ['Sl No', 'Complaint Category', 'Department Name', 'Refrence No', 'Complints Date', 'Complain Description', 'Status'];


  CSVsolvedReport() {
    const csvData = this.solvedComplaints.map((item, index) => {
      const rowData: any = {};
      // console.log(item);
      
      rowData['Sl No'] = index + 1;
      rowData['Complaint Category'] = item.category?.category_name ?? 'NA';
      rowData['Department Name'] = item.dept_name ?? 'NA';
      rowData['Refrence No'] = item.complaints_ref_no ?? 'NA';
      rowData['Complints Date'] = item.complaint_date ?? 'NA';
      rowData['Complain Description'] = item.complaints_desc ?? 'NA';
      rowData['Status'] = item.status?.complain_status_name ?? 'NA';
  
      return rowData;
    });
  
    const csvString = this.service.convertToCSV(csvData, this.csvColumns);
  
    // Create a Blob and generate a download link
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'solved_complaints.csv';
    link.click();
  }
  
  getColumnValue(item: any, column: string): any {
    const propKey = column.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  
    if (item && (item.hasOwnProperty(propKey) || item[propKey])) {
      return item[propKey];
    } else {
      console.warn(`Property "${column}" not found in item. Item:`, item);
      return null; // If a property is not found, return null
    }
  }
  
  selectedPages: number = 1;
  onPagesSelectionChange() {
    // Handle the event when the selected pages change
    // You can implement your logic here
    // this.pageSize=Number(this.pageSize) + Number(this.selectedPages)
    console.log(this.pageSize);
    
  }



// ---------------Pagination------------------
  pageSize:number = 8;
  currentPage = 1;

  get paginatedComplaints() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.solvedComplaints.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageNumber: number) {
    const totalPages = this.getPages().length;
  
    // Ensure the new page is within the valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.currentPage = pageNumber;
    }
  }
  
  pageArray:any[]=[1,2,3,4,5,6,7,8,9]
  getPages() {
    // const pageCount = Math.ceil(this.solvedComplaints.length / this.pageSize);
    // return Array.from({ length: pageCount }, (_, index) => index + 1);
    return this.pageArray;
  }
  


  

}
