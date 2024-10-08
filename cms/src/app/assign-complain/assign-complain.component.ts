import { Component, OnInit } from '@angular/core';
import { AllServiceService } from '../Services/all-service.service';
import { AllData } from '../models/all-data';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assign-complain',
  templateUrl: './assign-complain.component.html',
  styleUrls: ['./assign-complain.component.css']
})
export class AssignComplainComponent implements OnInit{
  constructor(private service:AllServiceService,private route:ActivatedRoute,private router:Router){}
   //========session area =============
  dpt_id:any
  org_id:any
  storedValue:any
  userdata:any
  getEmpDataArray:any = []
  //========session area ended=============

  org:any
  dept:any
  sentData:any
  sendOrg:any
  complain_id:any
  entry_by:any
  entry_by_emp:any
  dpt_name:any
  org_name:any


  ngOnInit(): void {
     this.complain_id=this.route.snapshot.paramMap.get('id')


      this.dept='DEPARTMENT'
      this.sendOrg ={"btn_name":"ORGANIZATION"}
      this.getCourse();


      //==================session area======================
      this. storedValue =sessionStorage.getItem('userdata');
      this.userdata = JSON.parse(this.storedValue)
      console.log(this.userdata.departmentId);
      this.dpt_id=this.userdata.departmentId;
      this.org_id=this.userdata.OrganizationId;
      this.entry_by = this.userdata.userId
      this.entry_by_emp = this.userdata.EmpName
      this.dpt_name = this.userdata.deptName
      this.org_name = this.userdata.OrganizationName
      console.log("org",this.org_id);
      this.getEmpDataArray.push({"dpt_id":this.dpt_id,"org_id":this.org_id})
      console.log(this.getEmpDataArray);

      this.getAllEmployee()


  }

  //toggle
  color:any = "#332D2D";
  bccolor:any = "white";
  color_ep:any = "";
  bccolor_ep:any = "";
  brad:any = "15px";
  pd:any = "3px";
  brad_ep:any = "";
  pd_ep:any = "";
  st:boolean = false;
  ep:boolean = true;

  click_value:any

  stClick(){
    this.click_value = 1;
    this.color = "#332D2D";
    this.bccolor = "white";
    this.brad = "15px";
    this.pd = "3px";
    this.color_ep = "";
    this.bccolor_ep = "";
    this.brad_ep = "";
    this.pd_ep = "";
    this.st = false;
    this.ep = true;
    //get student data

    }



    epClick(){
    this.click_value = 2;
    this.color = "";
    this.bccolor = "";
    this.brad = "";
    this.pd = "";
    this.color_ep = "#332D2D";
    this.bccolor_ep = "white";
    this.brad_ep = "25px";
    this.pd_ep = "3px";
    this.st = true;
    this.ep = false;
    }
    //toggle ended

//all work begains=================


all_dpt:any
getDepartment(sentData:any) {
  this.service.getdept(sentData).subscribe(
    (data: any) => {
     this.all_dpt = data
    },
    (err: any) => {
      console.log('Error:', err);
      // Handle errors as needed
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
//get allEmployee data
all_emp:any
getAllEmployee()
{
  this.service.getAllEmp(this.getEmpDataArray).subscribe((data:any)=>{
   console.log(data);
   this.all_emp = data
  },(err)=>{
    alert("Something Went wrong!!")
  })
}

//==========================toggle section

selectedItems: any[] = [];

checkboxChanged(selectedItem: any): void {
  if (selectedItem.isSelected) {
    // Checkbox is checked, add the item to the selectedItems array
    this.selectedItems.push({
      userId: selectedItem.userId,
      complain_id: this.complain_id, // Fixed value, replace with your actual value
      assign_to_emp:selectedItem.EmpName, // Fixed value, replace with your actual value
      action_type: 'emp',
      dept_id:this.dpt_id,
      entry_by:this.entry_by ,
      entry_by_emp:this.entry_by_emp,
      dept_name:this.dpt_name,
      org_id:this.org_id,
      org_name:this.org_name// Fixed value, replace with your actual value
    });
  } else {
    // Checkbox is unchecked, remove the item from the selectedItems array
    this.selectedItems = this.selectedItems.filter(item => item.userId !== selectedItem.userId);
  }
  console.log('Selected Items:', this.selectedItems);
}






assigToemp()
{
  if(this.selectedItems.length ==0){
    alert("Please Select Emp First!!")
  }else{
    this.service.assignToemp( this.selectedItems).subscribe((get:any)=>{
      alert(get);
      this.router.navigate(['dashboard/all_complain']);
    },(err:any)=>{
      console.log("Someting went wrong!!");

    })
  }
}
select_org_id:any
select_org_name:any
orG(or:any)
{
  this.org= or.split(',');
  this.select_org_id=this.org[0];
  this.select_org_name=this.org[1];
  this.sentData={"organisationID":this.select_org_id,"btn_name":"DEPARTMENT"}
  this.getDepartment(this.sentData);
}

select_dept_id:any
select_dept_name:any
selectDpt:any
depT(dpt:any)
{
  this.selectDpt=dpt.split(',');
  this.select_dept_id=this.selectDpt[0]
  this.select_dept_name=this.selectDpt[1]
}

file:any
  getFile(ev:any){
    this.file=ev.target.files[0]
  }
cmpln_details:any
action_detail(data:any)
{
  this.cmpln_details=data
}

assignToDept()
{
  const formdata=new FormData()
  formdata.append('complain_id', this.complain_id)
  formdata.append('action_type', 'dpt')
  formdata.append('entry_by',this.entry_by)
  formdata.append('entry_by_emp',this.entry_by_emp)
  formdata.append('action_details',this.cmpln_details)
  formdata.append('dept_id',this.select_dept_id)
  formdata.append('dept_name',this.select_dept_name)
  formdata.append('org_id',this.select_org_id)
  formdata.append('org_name',this.select_org_name)
  formdata.append('file',this.file)
  this.service.AssignToDept(formdata).subscribe((data:any)=>{
    alert(data);
    this.router.navigate(['dashboard/all_complain']);
  })
}


}
