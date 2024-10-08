import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AllServiceService } from '../Services/all-service.service';

@Component({
  selector: 'app-not-process-complain',
  templateUrl: './not-process-complain.component.html',
  styleUrls: ['./not-process-complain.component.css']
})
export class NotProcessComplainComponent {
  imageDirectoryPath: any = 'http://192.168.50.250:9000/ComplaintsFile';
  searchSolved:any
  message: string = '';
  org_id: any;
  dept_id: any;
  sessionData: any;
  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('userdata')
    this.org_id = JSON.parse(this.sessionData).OrganizationId
    this.dept_id = JSON.parse(this.sessionData).departmentId
    this.getInProcessedData();
    this.getStatus();
    // this.initialData()
  }
  constructor(private http: HttpClient) { }
  DetailArray: any;
  getInProcessedData() {
    this.http.get<any>('http://192.168.50.250:9000/api/Inprocessed/' + this.org_id + '/' + this.dept_id).subscribe((res: any) => {
      this.DetailArray = res;
    }
      // ,(error)=>{
      //   // this.message = 'Error occurred while processing the request.';
      //   this.message = this.DetailArray.error
      // }
    )
  }
  data: any;
  view(id: any) {
    // console.log(id);
    this.http.get<any>('http://192.168.50.250:9000/api/editInProcessed/' + this.org_id + '/' + this.dept_id + '/' + id).subscribe((res: any) => {
      this.data = res[0];
    })
  }
  get_status: any
  getStatus() {
    this.http.get<any>('http://192.168.50.250:9000/api/sts').subscribe((data: any) => {
      this.get_status = data;
    })
  }
  complaints_file: any
  getFile(ev: any) {
    this.complaints_file = ev.target.files[0]
    // console.log(this.complaints_file);
  }
  complaint_id: any;
  complaints_status_id: any
  complaints_desc: any
  updtInProcessed(id: any) {
    const formdata = new FormData()
    formdata.append('id', this.complaint_id)
    formdata.append('complaints_file', this.complaints_file)
    formdata.append('complaints_status_id', this.complaints_status_id)
    formdata.append('complaints_desc', this.complaints_desc)
    // console.log(formdata.value);
    this.http.post('http://192.168.50.250:9000/api/updtInProcessed/' + id, formdata).subscribe((data: any) => {
      location.reload();
    })
  }

  p: number = 1;
  itemsPerPage: number = 10;
  serialNumbers: number = 0;
  onPageChange(event: any): void {
    this.p = event;
  }

  PrintsolvedReport(){
    window.print();
  }
}
