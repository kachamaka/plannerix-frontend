import { HttpService } from './../http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private httpService: HttpService) { }
  vapidPublicKey = "BEhfpAWKg9VR38PWRMIw0bsviVSqfaK_48gt_LeTll-EbxGM2qv7m9wp3VCK1oyCCmTj7XfD2mi4vhN_J0Lsx_8";
  // const vapidPublicKey = 'BEuXJju5oEqJLZ8rrs12dcdWDSeIHwH2mxb8IIKV/CkRSHlpZStbWGfK+PaMRN9yz4Izb8DTRwP4bZ4vRXAak0c=';

  convertedVapidKey = this.urlBase64ToUint8Array(this.vapidPublicKey);
  
  askForNotifications() {
    return Notification.requestPermission()
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  registerForPushMessages() {
    console.log("register for push msg init");
    return new Promise((resolve, reject)=>{
      navigator.serviceWorker.getRegistration().then(res=>{
        const option = {
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
        }
        console.log("after service worker ready",res, option)
        res.pushManager.subscribe(option).then(sub=>{
          let stringifiedSub = JSON.stringify(sub);
          console.log(sub);
          console.log(stringifiedSub);
          // this.httpService.registerPush(stringifiedSub).subscribe((data:any)=>{
          //   console.log(data);
          // })
          resolve(stringifiedSub);
        }).catch(err=>{
          console.log(err, typeof err, Object.keys(err));
          // console.error(err);
          reject(err);
        });
      })

    })
  }

  registerServiceWorker(){
    navigator.serviceWorker.register("../../sw-worker-custom.js");
  }

  requestNotificationPermission(){
    return Notification.requestPermission().then((res)=>{
        console.log("notification", res)
    });
  }
    // navigator.serviceWorker.ready.then((reg)=>{
    //   reg.pushManager.subscribe({
    //     userVisibleOnly: true
    //   }).then(subscription=>{
    //     console.log(subscription)
    //     //send subscription to backend
    //   }).catch(err=>{
    //     console.error(err)
    //   })
    // })
  }
  

  //maybe registe service worker and rename service
