import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.css']
})
export class NavigationDesktopComponent implements OnInit {

  mode = "over";
  cssUrl: string;

  constructor(
    // public viewContainer:ViewContainerRef,
    private storageService: StorageService){
  }
  
  _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;

    // let dom = new BrowserDomAdapter();
    //    let el = this.viewContainer.element.nativeElement; 
    //    let myEle = dom.getElementsByClassName(el, "ng-sidebar__backdrop")[0];
    // console.log(myEle);
    setTimeout(() => {
      let sidebar_backdrop = document.getElementsByClassName("ng-sidebar__backdrop"); 
      let sidebar = sidebar_backdrop.item(0);
      console.log(sidebar);
      sidebar.classList.add("sidebar");
    }, 10);
    
  }
  
  setColor(){
    if (this.storageService.currentUrl=="home"||this.storageService.currentUrl==""){
      return "home";
    }else{
      return this.storageService.currentUrl;
    }
  }
  
  test(){
    console.log(this.setColor()=="settings");
  }


  ngOnInit() {
  }

}
