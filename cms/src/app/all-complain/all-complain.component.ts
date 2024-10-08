import { Component } from '@angular/core';
import { AllServiceService } from '../Services/all-service.service';

@Component({
  selector: 'app-all-complain',
  templateUrl: './all-complain.component.html',
  styleUrls: ['./all-complain.component.css']
})
export class AllComplainComponent {
  constructor (private service: AllServiceService){}
  complainDocPath="http://192.168.50.250:9000/ComplaintsFile"
  searchReferenceNumber:any;
  deptid:any
  storedValue:any
  userdata:any
  ngOnInit()
  {
     this.getStatus()
      this. storedValue =sessionStorage.getItem('userdata');
      this.userdata = JSON.parse(this.storedValue)
      console.log(this.userdata.departmentId);
      this.deptid=this.userdata.departmentId;
      this.FetchAllComplains()
  }

  get_status:any
  getStatus()
  {
      this.service.getstatuData().subscribe((data:any)=>{

        this.get_status = data;
        console.log(this.get_status);

      })
  }
  getRefdStatus(complain_id:any)
  {
    const formdata = new FormData();
    formdata.append('compId',complain_id);

      this.service.getRefdStatus(formdata).subscribe((data:any)=>{
        this.get_status = data;
        console.log('status',this.get_status);
      })
  }
allComplains:any

  FetchAllComplains(){
    this.service.fetchallcomplains(this.deptid).subscribe((data:any)=>{
      this.allComplains=data;
      console.log(this.allComplains)
    })
  }
  matchesSearch(data: any): boolean
  {
    if (!this.searchReferenceNumber)
    {
      return true; // If search input is empty, show all rows
    }
    const searchLower = this.searchReferenceNumber.toLowerCase();
    const referenceNumberLower = data.complaints_ref_no.toLowerCase();

    // Check if the reference number contains the search input
    return referenceNumberLower.includes(searchLower);
  }

  singleComplains:any
  status_name:any
  status_id:any
  FetchSingleComplains(cid:any){
    this.service.fetchsinglecomplains(cid).subscribe((data:any)=>{
      this.singleComplains=data;
      this.getRefdStatus(this.singleComplains.id);
      this.status_id=this.singleComplains.complaints_status_id
      this.status_name=this.singleComplains.complain_status_name
      console.log(this.singleComplains.complaints_status_id)
    })
  }

  file:any
  getFile(ev:any){
    this.file=ev.target.files[0]
    console.log(this.file);

  }
  updatedata:any;
  UpdateSingleData(cid:any,cmplnstatus:any,cmplncmnt:any)
  {
    const formdata=new FormData()
    formdata.append('file',this.file)
    formdata.append('cmplnstatus',cmplnstatus)
    formdata.append('cmplncmnt',cmplncmnt)

    this.service.UpdateSingleData(cid,formdata).subscribe((data:any)=>{
      alert(data);
      location.reload();
    })
  }

  AssignComplains(cid:any)
  {
    alert(cid);
  }


  getDownloadLink(billDoc: string): string {
    return `${this.complainDocPath}/${billDoc}`;
  }

  p: number = 1;
  itemsPerPage: number = 10;
  serialNumbers: number = 0;
  onPageChange(event: any): void {
    this.p = event;
  }
}
