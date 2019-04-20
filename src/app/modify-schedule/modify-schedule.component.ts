import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-modify-schedule',
  templateUrl: './modify-schedule.component.html',
  styleUrls: ['./modify-schedule.component.css']
})
export class ModifyScheduleComponent implements OnInit {
  @ViewChild("stepper") stepper: MatStepper;
  constructor( private httpService: HttpService) { }

  ngOnInit() {
    console.log(this.stepper);
    // setTimeout(()=>{
    //   this.stepper.next();
    // }, 2000);
  }

}
