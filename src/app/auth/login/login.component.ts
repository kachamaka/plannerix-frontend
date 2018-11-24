import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('input') Input: ElementRef;
  @ViewChild('input1') Input1: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  log(){
    console.log(this.Input.nativeElement.value);
    console.log(this.Input1.nativeElement.value);
  }

}
