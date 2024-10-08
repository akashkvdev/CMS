import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AllServiceService } from '../Services/all-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-raise-complain',
  templateUrl: './raise-complain.component.html',
  styleUrls: ['./raise-complain.component.css']
})
export class RaiseComplainComponent implements OnInit {

  storedValue: any;
  userdata: any;
  loginForm!: FormGroup;
  complain_category_id:any;
  complaints_desc:any;
  complaints_file:any;
  dept_id:any;
  org_id:any;
  complaints_status_id:any;
  complaints_ref_no:any;
  approved_by:any;
  complaint_date:any;
  entryby: any;
  getcatdata:any;
  dept_name:any;
  org_name:any;
  entry_by_name:any;
  
  file:any;

  constructor(private service:AllServiceService,private router: Router){}

  ngOnInit(){
    this.storedValue = sessionStorage.getItem('userdata');
    this.userdata = JSON.parse(this.storedValue);
    this.dept_id = this.userdata.departmentId;
    this.org_id = this.userdata.OrganizationId;
    this.entryby = this.userdata.userId;
    this.dept_name = this.userdata.deptName;
    this.org_name = this.userdata.OrganizationName;
    this.entry_by_name = this.userdata.EmpName;
    this.loginForm = new FormGroup({
      complain_category_id: new FormControl('', Validators.required),
      complaints_desc: new FormControl('', Validators.required),
      // complaints_file: new FormControl('', Validators.required),

      // loginForm.append("complaints_file",this.file,this.file.name);

      complaints_file: new FormControl('', Validators.required),
      dept_id: new FormControl( this.dept_id, Validators.required),
      org_id: new FormControl(this.org_id, Validators.required),
      complaints_status_id: new FormControl('', Validators.required),
      complaints_ref_no: new FormControl('', Validators.required),
      approved_by: new FormControl('', Validators.required),
      complaint_date: new FormControl('', Validators.required),
      entry_by: new FormControl(this.entryby, Validators.required),
      dept_name:new FormControl(this.dept_name,Validators.required),
      org_name:new FormControl(this.org_name,Validators.required),
      entry_by_name:new FormControl(this.entry_by_name,Validators.required)
    });

    this.getCategory()
  }

  raiscomplains(){
    const formdata=new FormData()
    formdata.append("complain_category_id",this.loginForm.value.complain_category_id);
    formdata.append("complaints_desc",this.loginForm.value.complaints_desc);
    formdata.append("complaints_file",this.file);
    formdata.append("dept_id",this.loginForm.value.dept_id);
    formdata.append("org_id",this.loginForm.value.org_id);
    formdata.append("complaints_status_id",this.loginForm.value.complaints_status_id);
    formdata.append("complaints_ref_no",this.loginForm.value.complaints_ref_no);
    formdata.append("complaint_date",this.loginForm.value.complaint_date);
    formdata.append("entry_by",this.entryby);
    formdata.append("dept_name",this.dept_name),
    formdata.append("org_name",this.org_name),
    formdata.append("entry_by_name",this.entry_by_name)

    this.service.raisComplain(formdata).subscribe((res:any)=>{
      alert("Complain raised successfully");
      window.location.reload();
    }),(err:any)=>{
      alert("something went wrong");
    }
  }
// FILE UPLOAD
fileName:any
  fileupload(event:any){
    // console.log(event);
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    console.log(this.file);
  }
  // for getting the category  name and its id
 
  getCategory(){
    this.service.getCategories().subscribe((res:any)=>{
    this.getcatdata = res;
    console.log(this.getcatdata); 
    }),(err:any)=>{
      alert("something went wrong");
    }
  }
}
