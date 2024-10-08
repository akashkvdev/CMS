import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AllData, Process } from '../models/all-data';


@Component({
  selector: 'app-processed',
  templateUrl: './processed.component.html',
  styleUrls: ['./processed.component.css']
})
export class ProcessedComponent {
  imageDirectoryPath: any = 'http://192.168.50.250:9000/ComplaintsFile';
  searchSolved:any
  status_code: any;
  org_id: any;
  dept_id: any;
  sessionData: any;
  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('userdata')
    this.org_id = JSON.parse(this.sessionData).OrganizationId
    this.dept_id = JSON.parse(this.sessionData).departmentId
    this.getProcessedData(this.org_id, this.dept_id);

    // this.initialData()
  }
  constructor(private http: HttpClient) { }

  DetailArray: any;

  getProcessedData(org_id: any, dept_id: any) {
    this.http.get<any>('http://192.168.50.250:9000/api/processed/' + org_id + '/' + dept_id).subscribe((res: any) => {
      this.DetailArray = res;
      //  console.log(this.DetailArray )   
    }
      // ,(error)=>{
      //   // this.message = 'Error occurred while processing the request.';
      //   this.status_code = this.DetailArray.error;
      // }
    )
  }


  data: any;
  view(id: any) {
    // console.log(id);
    this.http.get<any>('http://192.168.50.250:9000/api/editProcessed/' + this.org_id + '/' + this.dept_id + '/' + id).subscribe((res: any) => {
      console.log(res);
      this.data = res;
    })
  }

  p: number = 1;
  itemsPerPage: number = 10;
  serialNumbers: number = 0;
  onPageChange(event: any): void {
    this.p = event;
  }

  Printprocessed(){
    window.print();
  }
}
