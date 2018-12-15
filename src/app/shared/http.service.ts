import { SingleSubject } from './../models/subject.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  additionalSubjects: SingleSubject[] = [];
  
  subjects: SingleSubject[] = [{"subject":"Math","checked":false,"SIP":false,"ZIP":false},
  {"subject":"English","checked":false,"SIP":false,"ZIP":false},
  {"subject":"BG","checked":false,"SIP":false,"ZIP":false},
  {"subject":"German","checked":false,"SIP":false,"ZIP":false},
  {"subject":"Geo","checked":false,"SIP":false,"ZIP":false},
  {"subject":"Bio","checked":false,"SIP":false,"ZIP":false},
  {"subject":"Chemistry","checked":false,"SIP":false,"ZIP":false},
  {"subject":"Physic","checked":false,"SIP":false,"ZIP":false}];

  allCheckedSubjects: SingleSubject[] = [];

  periods = [[],[],[],[],[]];
  
}
