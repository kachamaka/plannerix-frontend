import { HttpService } from './shared/http.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { SwUpdate } from '@angular/service-worker';

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

  constructor(private httpService: HttpService,private sw: SwUpdate) {
    sw.available.subscribe((event)=>{
      sw.activateUpdate().then(()=>document.location.reload());
    })
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
    this.httpService.getJoke().subscribe((data:any)=>{
      console.log(data);
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
