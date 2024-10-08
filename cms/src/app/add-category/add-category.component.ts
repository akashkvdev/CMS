import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AllServiceService } from '../Services/all-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  storedValue: any;
  userdata: any;
  entryby: any;
  loginForm!: FormGroup;
  category_name:any
  getcatdata:any[]=[];
constructor(private service:AllServiceService){}


  ngOnInit() {
    this.storedValue = sessionStorage.getItem('userdata');
    this.userdata = JSON.parse(this.storedValue);
    this.entryby = this.userdata.userId;
   

    this.loginForm = new FormGroup({
      category_name: new FormControl('', Validators.required),
      status: new FormControl('1', Validators.required),
      entry_by: new FormControl(this.entryby, Validators.required), // Set the value to entryby
    });
    this.getCategory()
  }
  getCategory(){
    this.service.getCategories().subscribe((res:any)=>{
    this.getcatdata = res;
    console.log(this.getcatdata);
    
    }),(err:any)=>{
      alert("something went wrong");
      // this.getCategory()
    }
  }



  addCategory() {
    const categoryName = this.loginForm.value.category_name;

    // Check if category name is empty or contains special characters
    if (!categoryName || !/^[a-zA-Z\s]+$/.test(categoryName)) {
      alert("Invalid category name. Please enter alphanumeric characters and spaces only.");
      return;
    }

    // Proceed with adding the category
    this.service.addCategories(this.loginForm.value).subscribe(
      (res: any) => {
        alert("Data inserted successfully");
        this.loginForm.reset();
        this.getCategory();
        window.location.reload();
      },
      (err: any) => {
        if (err.status === 422) {
          // Validation error, check if it's a duplicate entry
          const errorResponse = err.error;
          if (errorResponse && errorResponse.error === 'Category name already exists') {
            alert("Error: Category name already exists");
          } else {
            alert("Category name already exists. Please check your input.");
          }
        } else {
          alert("Category name already exists");
        }
      }
    );
}

  



  updateCategories(){
    console.log(this.updateForm.value)
    this.service.updateCategorie(this.updateForm.value).subscribe((data:any)=>{
      alert(data);
      this.getCategory();
      if(data){
        this.getCategory();
      }
    })
  }

  updateForm!:FormGroup
  editCat(id:any,name:any){
    this.category_name = name
    console.log(id,name,this.category_name );
    this.updateForm = new FormGroup({
      cat_name: new FormControl(this.category_name , Validators.required),
      category_id: new FormControl(id, Validators.required),
      entry_by: new FormControl(this.loginForm.value.entry_by, Validators.required), // Set the value to entryby
    });
    console.log(this.updateForm.value)
  }



  //For Pagination 
pageSize = 8;
currentPage = 1;

get paginatedCategory() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.getcatdata.slice(startIndex, startIndex + this.pageSize);
}

onPageChange(pageNumber: number) {
  const totalPages = this.getPages().length;

  // Ensure the new page is within the valid range
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    this.currentPage = pageNumber;
  }
}


getPages() {
  const pageCount = Math.ceil(this.getcatdata.length / this.pageSize);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}

}
