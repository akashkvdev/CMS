import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AllServiceService } from 'src/app/Services/all-service.service';
import { LoginComponent } from 'src/app/login/login.component';


@Component({
  selector: 'app-department-wise-report',
  templateUrl: './department-wise-report.component.html',
  styleUrls: ['./department-wise-report.component.css']
})
export class DepartmentWiseReportComponent {
  userData:any;
  constructor(private service:AllServiceService){
    this.userData=this.service.getUserSessionData()
  }
  org:any 
  dept:any
  sentData:any
  sendOrg:any
  ngOnInit(): void {
      this.dept='DEPARTMENT'
     
      this.sendOrg ={"btn_name":"ORGANIZATION"}
      this.getCourse();
  }

  
all_dpt:any
getDepartment() {
  this.service.getdept(this.sentData).subscribe(
    (data: any) => {
     this.all_dpt = data
     console.log(data);
     
    },
    (err: any) => {
      console.log('Error:', err);
     }
  );
}

all_course:any
getCourse(){
  this.service.getCourse(this.sendOrg).subscribe(
    (data: any) => {
     this.all_course = data
    },
    (err: any) => {
      console.log('Error:', err);
      // Handle errors as needed
    }
  );
}


orG(or:any)
{
  this.org= or
  this.sentData={"organisationID":this.org,"btn_name":this.dept}
  this.getDepartment();
}

 deptt=true;
alldata:any;
deptWise(orga:any,dept:any){
  this.deptt=false;

  console.log(orga,dept);
  
  this.service.getDeptWise(orga,dept).subscribe((res:any)=>{
    console.log(res);
    this.alldata=res[0];
    
  })
}

@ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

PrintsolvedReport() {
  
  window.print();

}
}