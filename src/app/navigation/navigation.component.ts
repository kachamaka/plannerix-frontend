import { StorageService } from './../shared/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  el: HTMLCollectionOf<HTMLElement>;
  prevEl: HTMLCollectionOf<HTMLElement>;
  route: any;
  emptyString = "";

  // private previousUrl: string;
  // private currentUrl: string;

  // constructor(private router: Router) {
  //   router.events.subscribe((val)=>{
  //     if(val instanceof NavigationEnd){
  //       this.previousUrl = this.currentUrl;
  //       this.currentUrl = val.url.split("/")[1];
  //     }
  //   })
  //  }
  constructor(private storageService: StorageService){

  }

  ngOnInit(){
    
  }

  setColor(){
    if (this.storageService.currentUrl=="home"||this.storageService.currentUrl==""){
      return "home";
    }else{
      return this.storageService.currentUrl;
    }
  }



}
