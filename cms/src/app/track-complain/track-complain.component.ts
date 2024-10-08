import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllServiceService } from '../Services/all-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-complain',
  templateUrl: './track-complain.component.html',
  styleUrls: ['./track-complain.component.css']
})
export class TrackComplainComponent {
  complainid: any
  url: string = 'http://103.39.241.158:5003/api'
  filePath: string = "http://103.39.241.158:5003/ComplaintsFile/"
  constructor(private http: HttpClient, private service: AllServiceService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.initialData()
  }

  data: any
  initialData() {
    // getting data from link
    this.route.params.subscribe(params => {
      const complainID = params['id'];
      this.complainid = complainID
    });

    this.http.get<any>(this.url + '/getSingleTrack/' + this.complainid).subscribe({
      next: (res) => {
        this.data = res
      }, error: (e) => {
        console.log(e)
      }
    })
  }

  print() {
    window.print()
  }
}
