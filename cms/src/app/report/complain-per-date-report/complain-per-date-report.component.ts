
import { Component,OnInit} from '@angular/core';
import { AllServiceService } from 'src/app/Services/all-service.service';
import {  ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-complain-per-date-report',
  templateUrl: './complain-per-date-report.component.html',
  styleUrls: ['./complain-per-date-report.component.css']
})
export class ComplainPerDateReportComponent implements OnInit {
  cmplain:any;
  data:any;
  fetchdata:any;
  TransactionDetails:any;
  noDataFound: boolean = false;
  constructor (private Service: AllServiceService){}
  ngOnInit(): void {
}

AllComplainsPerDate(formdate:any, todate: any){
  this.Service.ComplainPerDate(formdate,todate).subscribe((res: any) => {
    this.cmplain = res;
 //  console.log(this.cmplain)
  this.noDataFound = this.cmplain.length === 0;
  });

  }


 @ViewChild('printableDiv', { static: false }) printableDiv!: ElementRef;

  printDiv() {
    // const printContents = this.printableDiv.nativeElement.innerHTML;
    // const originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // location.reload()
    window.print();
  }


}