import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllServiceService } from 'src/app/Services/all-service.service';

@Component({
  selector: 'app-all-complaint-report',
  templateUrl: './all-complaint-report.component.html',
  styleUrls: ['./all-complaint-report.component.css']
})
export class AllComplaintReportComponent implements OnInit{
  ngOnInit(): void {
    this.getAllComplaints()
  }
  userData:any;
  constructor(private service:AllServiceService){
    this.userData=this.service.getUserSessionData()
  }


  allComplaints:any;
  getAllComplaints(){
    this.service.allComplaint(this.userData.OrganizationId).subscribe((res:any)=>{
      console.log(res);
      this.allComplaints=res[0];
      this.toFilter=res[0];
      
    },(err:any)=>{
      console.log(err);
      
    })
  }

  term: any = ""
  toFilter = []
  find(term: any) {
    this.allComplaints = this.toFilter.filter((item: any) =>
      item.complaints_ref_no.toUpperCase().includes(term.trim().toUpperCase())
    )
  }

  @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  p: number = 1;      // Current page
  itemsPerPage: number = 10; // Number of items per page
  onPageChange(event: any): void {
    this.p = event;
  }

printDiv() {
  
  window.print();

}


}