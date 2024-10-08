import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BodyComponent } from './layout/body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { RaiseComplainComponent } from './raise-complain/raise-complain.component';
import { HttpClientModule } from '@angular/common/http';

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
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { SolvedComplaintsPipe } from './pipes/search-pipe.pipe';
import { PendingComplaintsPipe } from './pipes/search-pipe.pipe';
import { NotProccessedComplaintsPipe } from './pipes/search-pipe.pipe';
import { ProccessedComplaintsPipe } from './pipes/search-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent,
    DashboardComponent,
    AddCategoryComponent,
    RaiseComplainComponent,
    AllComplainComponent,
    AssignComplainComponent,
    NotProcessComplainComponent,
    ProcessedComponent,
    AllComplaintReportComponent,
    DepartmentWiseReportComponent,
    SolvedComplainReportComponent,
    PendingComplainReportComponent,
    ComplainPerDateReportComponent,
    ComplaintTrackComponent,
    TrackComplainComponent,
    ReferComplainComponent,
    LoginComponent,
    SearchPipePipe,
    SolvedComplaintsPipe,
    PendingComplaintsPipe,
    NotProccessedComplaintsPipe,
    ProccessedComplaintsPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
