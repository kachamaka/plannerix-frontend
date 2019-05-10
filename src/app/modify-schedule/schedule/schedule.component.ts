import { HttpService } from 'src/app/shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';
import { Schedule } from 'src/app/models/modifySchedule.model';
import { UpdateSchdeule } from 'src/app/actions/modifySchedule.action';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Select(ModifyScheduleState.getChosenSchedule) schedule: Observable<Schedule>;
  @Select(ModifyScheduleState.getSubjects) subjects:Observable<Subject>;
  constructor(private httpService: HttpService, private store: Store, private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  onDone(){
    this.store.dispatch(new UpdateSchdeule()).subscribe((data)=>{
      // this.httpService.loadSchedule();
      console.log(data);
      // if(this.storageService.isDesktop()){
      //   this.router.navigate(["/desktop/schedule"]);      
      // }else{
      //   this.router.navigate(["schedule"]);
      // }
    });
  }
}
