import { Component } from '@angular/core';
import { AllServiceService } from '../Services/all-service.service';


@Component({
  selector: 'app-complaint-track',
  templateUrl: './complaint-track.component.html',
  styleUrls: ['./complaint-track.component.css']
})
export class ComplaintTrackComponent {
  constructor(private service: AllServiceService) { }

  orgID: any
  deptID: any
  empID: any

  jsonData: any
  sessionData: any

  ngOnInit() {
    this.sessionData = sessionStorage.getItem('userdata')
    this.orgID = JSON.parse(this.sessionData).OrganizationId
    this.deptID = JSON.parse(this.sessionData).departmentId
    this.empID = JSON.parse(this.sessionData).userId

    this.initialData()
  }

  data: any

  initialData() {
    this.service.getComplnTrack(this.orgID, this.deptID ,this.empID).subscribe((res) => {
      this.data = res.data
      this.toFilter = res.data
    })
  }
  term: any = ""
  toFilter = []
  find(term: any) {
    this.data = this.toFilter.filter((item: any) =>
      item.complaints_ref_no.toUpperCase().includes(term.trim().toUpperCase())
    )
  }
 
  p: number = 1;      // Current page
  itemsPerPage: number = 10; // Number of items per page
  onPageChange(event: any): void {
    this.p = event;
  }
}
