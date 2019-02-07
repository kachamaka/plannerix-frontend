import { Component, OnInit, Input } from '@angular/core';
import { Grade } from '../grades.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  @Input('grades') grades: Array<Grade>;
  constructor() { }

  ngOnInit() {
  }

}
