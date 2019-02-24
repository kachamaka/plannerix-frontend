import { HttpService } from './shared/http.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 's-org';

  constructor(private httpService: HttpService) {

  }
  ngOnInit(){
    let tokenData = {
      "token":localStorage.getItem("token")
    }
    this.httpService.getSchedule(tokenData).subscribe((data:any)=>{
      this.httpService.periods = data.schedule;
    })
    this.httpService.getSubjects(tokenData).subscribe((data:any)=>{
      this.httpService.subjectData = data.subjects;
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
