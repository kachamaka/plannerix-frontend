import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() { }

  askForNotifications(cb) {
    Notification.requestPermission()
  }

  registerForPushMessages() {
    navigator.serviceWorker.ready.then((reg)=>{
      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(subscription=>{
        console.log(subscription)
        //send subscription to backend
      }).catch(err=>{
        console.error(err)
      })
    })
  }

  //maybe registe service worker and rename service
}
