import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AllServiceService } from '../Services/all-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor (private service:AllServiceService, private router: Router){}

loginForm = new FormGroup({
  employeeID:new FormControl('', Validators.required),
  password:new FormControl('', Validators.required),
})


//====================================LOGIN FUNCTION===========================//
loginUser() {
  this.service.login(this.loginForm.value).subscribe(
    (data: any) => {
      if (data) {
        console.warn(data);  
        // Store user data in session storage
        sessionStorage.setItem('userdata',JSON.stringify(data[0]));
        // this.router.navigate(['/dashboard']);
        window.location.href = '/dashboard';
        this.service.setAuthenticationStatus(true);
      }
    },
    (error) => {
      console.error('Error during login:', error);
    }
  );
}

showPassword = false;
passwordFieldType = 'password';

// ... existing code

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
  this.passwordFieldType = this.showPassword ? 'text' : 'password';
}


//===========to call session======================//
// storedValue:any
// bks(){
//   this. storedValue =sessionStorage.getItem('userdata');
//   console.log( JSON.parse(this.storedValue));
  
// }
 
   
 
}
