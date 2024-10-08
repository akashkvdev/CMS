import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {
  private isAuthenticatedFlag: boolean = false;
  private apiUrl = 'http://103.92.47.35  ';
  apiUrlcms="http://103.39.241.158:5003/api";
  constructor(private http:HttpClient) {
    sessionStorage.setItem('url',this.apiUrlcms)
    this.isAuthenticatedFlag = sessionStorage.getItem('isAuthenticated') === 'true';
   }

   //For CSV 
convertToCSV(data: any[], columns: string[]): string {
  const header = columns.join(',');
  const rows = data.map(obj => columns.map(column => obj[column]).join(','));
  return [header, ...rows].join('\n');
}

   userData:any
   getUserSessionData(){
     this.userData=sessionStorage.getItem('userdata')
     return JSON.parse(this.userData);
   }


  // Set the authentication status
  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticatedFlag = status;

    sessionStorage.setItem('isAuthenticated', status.toString());
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }



  //====================================LOGIN FUNCTION===========================//
  login(data: any): Observable<any> { 
    const apiUrl = '  http://103.92.47.35  /hitechErp/Api/ThirdpartyResponse/OutBoundResponseApi.php';
    const payload = `{"btn_name": "LOGIN", "employeeID": "${data.employeeID}", "password": "${data.password}"}`;
  
    return this.http.post<any>(`${this.apiUrl}/hitechErp/Api/ThirdpartyResponse/OutBoundResponseApi.php`, payload).pipe(
      catchError((error: any) => {
        console.error('Error during login:', error);
        throw error; 
      })
    );
  }


    //====================================DEPARTMENT // COURSE ===========================//
   
  getdept(jsonData: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>('http://103.92.47.35  /hitechErp/Api/ThirdpartyResponse/OutBoundResponseApi.php', jsonData, { headers });
  }
    
  getCourse(jsonData: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>('http://103.92.47.35  /hitechErp/Api/ThirdpartyResponse/OutBoundResponseApi.php', jsonData, { headers });
  }





    //Report Section Here
  // Solved Report
  get_solved_complaints(deptID:any,orgId:any){
    return this.http.get(`${this.apiUrlcms}/sComplaints/${deptID}/${orgId}`)
  }

  //Pending Report
  get_pending_complaints(deptID:any,orgId:any){
    return this.http.get(`${this.apiUrlcms}/pComplaints/${deptID}/${orgId}`)
  }
    //==========================get data category===============
    getstatuData(){
      return this.http.get(`${this.apiUrlcms}/get_status`);
    }


  // ===========================  ADD CATEGORIES  =============================================

  addCategories(data:any){
    return this.http.post(`${this.apiUrlcms}/addcatagories`,data)
    }
    getCategories(){
      return this.http.get(`${this.apiUrlcms}/getCategories`)
      }

      updateCategorie(data:any){
        return this.http.post(`${this.apiUrlcms}/update_categories`,data)
      }
      
      // ===================== RAIS COMPLAINS =====================================
      raisComplain(data:any){
        return this.http.post(`${this.apiUrlcms}/raisComplains`,data)
      }


    // ===================================================================== Complaint Tracking
    
    // ===================================================================== Complaint Tracking
   getComplnTrack(orgID:any,deptID:any,empID:any){
    return this.http.get<any>(this.apiUrlcms+'/'+'compln_tracking/'+orgID+'/'+deptID+'/'+empID)
  }



  //Aseema
  
ComplainPerDate(fdate:any,tdate:any){
  return this.http.get(`${this.apiUrlcms}/complain_per_date/${fdate}/${tdate}`)
  }

  // soumya
  fetchallcomplains(data:any){
    return this.http.get(`${this.apiUrlcms}/fetch/all/complains/`+data);
  }

  fetchsinglecomplains(data:any){
    return this.http.get(`${this.apiUrlcms}/fetch/single/complains/`+data);
  }

  UpdateSingleData(cid:any,data:any){
    return this.http.post(`${this.apiUrlcms}/updatesingledata/`+cid,data);
  }


    //====================================assign to ===========================//
    getAllEmp(data: any): Observable<any> {
      const payload = `{"organisationID":"${data[0].org_id}","departmentID":"${data[0].dpt_id}","btn_name":"EMPLOYEEDETAILBYDEPT"}`;
      return this.http.post<any>(`${this.apiUrl}/hitechErp/Api/ThirdpartyResponse/OutBoundResponseApi.php`, payload).pipe(
        catchError((error: any) => {
          console.error('Error during login:', error);
          throw error;
        })
      );
    }


    assignToemp(data:any)
    {
     return this.http.post(`${this.apiUrlcms}/AssignToEmp/`,data);
    }

    AssignToDept(data:any)
    {
      return this.http.post(`${this.apiUrlcms}/AssignToDept/`,data);
    }


    //Jasmine
    allComplaint(org_id:any){
      return this.http.get(`${this.apiUrlcms}/dWisecmsReport/${org_id}`)
    }

    getDeptWise(org_id:any,dept_id:any){
      return this.http.get(`${this.apiUrlcms}/dWisecmsReport/${org_id}/${dept_id}`)
    }



     // refd complaint (manoj)
   getRefdStatus(comp_id:any){
    return this.http.post(`${this.apiUrlcms}/getRefdStatus`,comp_id);
  }
  getallRefdComplaint(data:any){
    return this.http.post(`${this.apiUrlcms}/getRefdComplaints`,data);
  }
  saveUpdatedRefdData(data:any){
    return this.http.post(`${this.apiUrlcms}/updateRefdComp`,data);
  }

  // track complaint
  
}
