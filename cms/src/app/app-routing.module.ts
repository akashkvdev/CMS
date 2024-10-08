import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { RaiseComplainComponent } from './raise-complain/raise-complain.component';
import { AllComplainComponent } from './all-complain/all-complain.component';
import { AssignComplainComponent } from './assign-complain/assign-complain.component';
import { NotProcessComplainComponent } from './not-process-complain/not-process-complain.component';
import { ProcessedComponent } from './processed/processed.component';
import { AllComplaintReportComponent } from './report/all-complaint-report/all-complaint-report.component';
import { DepartmentWiseReportComponent } from './report/department-wise-report/department-wise-report.component';
import { SolvedComplainReportComponent } from './report/solved-complain-report/solved-complain-report.component';
import { PendingComplainReportComponent } from './report/pending-complain-report/pending-complain-report.component';
import { ComplainPerDateReportComponent } from './report/complain-per-date-report/complain-per-date-report.component';
import { ComplaintTrackComponent } from './complaint-track/complaint-track.component';
import { TrackComplainComponent } from './track-complain/track-complain.component';
import { ReferComplainComponent } from './refer-complain/refer-complain.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './Auth/auth.guard';



const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},

 
  {path:'dashboard',canActivate:[AuthGuard], component:DashboardComponent,children:[

    {path:'add-category', component:AddCategoryComponent},
    {path:'raise-complaint', component:RaiseComplainComponent},
    {path:'complaint-track', component:ComplaintTrackComponent},
    {path:'all_complain', component:AllComplainComponent},
    {path:'assign_complain/:id', component:AssignComplainComponent},
    {path:'not-process-complain', component:NotProcessComplainComponent},
    {path:'process-complain', component:ProcessedComponent},
    {path:'all-complain-report', component:AllComplaintReportComponent},
    {path:'department-wise', component:DepartmentWiseReportComponent},
    {path:'solved-complaint', component:SolvedComplainReportComponent},
    {path:'pending-complaint', component:PendingComplainReportComponent},
    {path:'complain-per-date', component:ComplainPerDateReportComponent},
    {path:'track_complain/:id', component:TrackComplainComponent},
    {path:'refer_complain', component:ReferComplainComponent}
    
  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
