import { Component, OnInit } from '@angular/core';
import { AllServiceService } from '../Services/all-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-refer-complain',
  templateUrl: './refer-complain.component.html',
  styleUrls: ['./refer-complain.component.css']
})
export class ReferComplainComponent implements OnInit{
  form!: FormGroup;
  
  constructor (private service: AllServiceService,private fb: FormBuilder){
    
this.form = this.fb.group({
  statusName: ['']  // Initialize with a default value if needed
});
  }

//  ------------------------------------------------------------------------------------
  get_status:any
  storedValue:any
  userdata:any
  emp_hide:boolean = false;
  dataForRefdData:any =[];

  ngOnInit(){
    

    this. storedValue =sessionStorage.getItem('userdata');
    this.userdata = JSON.parse(this.storedValue)
    // this.dataForRefdData.push(this.userdata.departmentId,this.userdata.userId);

    console.log(this.userdata);
    // console.log(this.dataForRefdData);

// -----------------------------------------------------------------------------b
    if((this.userdata.roleName)!="Complain Manager"){
    this.emp_hide = true
    }else{
      this.emp_hide = false
    }



    this.getallRefdComplaint();
  }


// --------------------------------------------------------------------------------------------
  id:any;
  dept_id:any;




  getallRefdComplaintdata:any;

  
  toggleDescription(refdData: any): void {
    refdData.showFullDescription = !refdData.showFullDescription;
  }

  imageDirectoryPath: any = 'http://192.168.50.250:9000/uploads/';

  getallRefdComplaint(){
    // console.log(this.dataForRefdData);
    // console.log(this.userdata.userId);
    
    const formdata=new FormData();
    formdata.append('dept_id',this.userdata.departmentId);
    formdata.append('user_id',this.userdata.userId);
    formdata.append('designation',this.userdata.designationName);

    
    this.service.getallRefdComplaint(formdata).subscribe((res:any)=>{
      this.getallRefdComplaintdata = res;
      console.log(res);
      this.newStatus=res[0].complaints_status_id;
      this.getRefdStatus(res[0].complain_id);

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
 



  newStatus:string='';
  newComment:string='';
  file:string='';
  date:Date=new Date();



  UploadFile(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      console.log(this.file);
    }
  }
  // this.newStatus='h'
  
  currentStatus(event:any){
    
    this.newStatus = event.target.value;
    console.log(this.newStatus);
    
  }


allpreviousData:any;
updateRefdData(data:any){
  console.log(this.allpreviousData);
  const formdata=new FormData();
  formdata.append('preveousData',JSON.stringify(this.allpreviousData))
  formdata.append('status_id',this.newStatus)
  formdata.append('newComment',this.newComment)
  formdata.append('document',this.file)
  formdata.append('log_emp',this.userdata.EmpName);
  formdata.append('logid',this.userdata.userId);
  this.service.saveUpdatedRefdData(formdata).subscribe((res:any)=>{
    console.log(res);
    window.location.reload();
  });
}


updateAllAdata(data:any){
  // console.log(data);
  this.allpreviousData=data;
  
  
}
  
}
