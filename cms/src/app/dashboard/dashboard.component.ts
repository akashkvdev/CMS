import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

storedValue:any
userdata:any
  router: any;
  emp_hide:boolean = false;
ngOnInit(){
  this. storedValue =sessionStorage.getItem('userdata');
  this.userdata = JSON.parse(this.storedValue)
  console.log(this.userdata.roleName);
  if((this.userdata.roleName)!="Complain Manager"){
  this.emp_hide = true
  }else{
    this.emp_hide = false
  }
}


forward(){
history.forward()
}

backward(){
  history.back()
}


logout(){
  const confirmed = window.confirm('Are you sure you want to log out?');

  if (confirmed) {
    sessionStorage.clear();
    window.location.href = '/';
  }
}
}