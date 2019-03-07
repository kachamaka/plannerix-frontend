

let version = makeVersion()
//                        (eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani|js|json|html|css|ico)
let reg = new RegExp(".*\.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani|js|json|html|css|ico)$");
let cacheRequests = [
  "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getSchedule",
  "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getWeeklyEvents",
  "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getYearGrades",
  "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/nextPeriod",
  "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getProfile"
]

let routers = [
  "/calendar", // ==> "/"
  "/home",
  "/not-found",
  "/schedule",
  "/settings",
  "/login",
  "/register",
  "/register/subjects",
  "/register/schedule-input",
  "/grades",
  "/grades/recent-grades",
  "/grades/year-grades",
  "/grades/all-grades",
  "/desktop",  
  "/desktop/recent-grades",
  "/desktop/year-grades",
  "/desktop/all-grades",
]

self.addEventListener("install", (e)=>{
  caches.open(version).then(cache=>{
    cache.add(self.origin).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.warn("can't add", self.origin, err)
    });
  }).catch(err=>{
    console.warn("can't load", self.origin, err);
  })
  self.skipWaiting();
  console.log(`Service Worker installed with version: ${version}`);
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(cachesNames=>{
      return Promise.all(
        cachesNames.map(cache =>{
          if(!cache.includes(version)) {
            console.log(`Deleting chache ${cache}`);
            caches.delete(cache);
          }
        })
      );
    })
  );
  console.log("Service worker active");
})

self.addEventListener("fetch",function(event) {
    let url = matchRoutes(event.request.url);
    if (url.includes("html")) {
      console.warn(url)
    }
    event.respondWith(
      fetch(event.request).then(res=>{
        const resClone = res.clone();
        if(url.startsWith("http") && validUrl(url)){
          caches.open(version)
          .then(cache => {
            cache.put(url, resClone)
          })
          }
          if(!res) {
            console.log(url, res);
          }
          return res;
      })
      .catch(err=>{
            return caches.match(url).then(res => res);
      })
    )

})

function makeVersion() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function checkType(url) {
    urlSplit = url.split("/");
    urlType = urlSplit[urlSplit.length-1];
    if(urlType.indexOf('.') > -1){
        return true;
    }else{
        return false;
    }
}

function validUrl(url) {
    if (new RegExp(".*/$").test(url)) return true;
    if (reg.test(url)) {
      return true;
    }
    for(let i = 0; i < cacheRequests.length; i++) {
      if(url == cacheRequests[i]) {
        return true;
      }
    }
    return false;
}

function matchRoutes(url) {
  for(let i =0; i < routers.length;i++) {
    let r = new RegExp(".*"+ routers[i] + "$")
    console.log(url, r.test(url))
    if (r.test(url)) return "/"
  }
  return url;
}

self.addEventListener("notificationclick", (event)=>{
  console.log(event);
  switch (event.notification.tag) {
    default:
      handleOpenHome(event);
      break;
  }
})

function handleOpenHome(event) {
  event.preventDefault();

  event.notification.close();
  event.waitUntil(
      clients.matchAll({includeUncontrolled: true, type: "window"}).then( windowClients => {
        // console.log(windowClients);
        // console.log(self);
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // console.log(client.url === self.origin, client.url.includes(self.origin),client.focus, client.url, self.origin);
              if ((client.url === self.origin || client.url.includes(self.origin)) && client.focus ) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow(self.origin);
          }
      })
  );
}

// new Notification("",{
//   data
// })
let getNotifications = new Promise((resolve, reject)=>{
  let checkTime = 1; //when to open 
  // let checkTime = getTime() + 5
  let over5s = getTime() + 5;
  let notification ;
  let p = undefined;
  let parsedTime = 0;

  // let parsedTime = getTime()+8 + 60*60;
  let i = 0
  setInterval(()=>{
    // get events for the next week
    let date = new Date();
    dateDay = date.getDay();
    if(dateDay == 6 || dateDay == 7){
      if(parseTime("08:00") == getTime()){
        getProfileNotifications().then((notifications)=>{
          if (!notifications["all"]) return
          if (!notification["events"]) return
          getWeeklyEvents.then((weeklyEventsCount)=>{
            if(weeklyEventsCount > 0){
              let n = self.registration.showNotification("Седмични събития", {
                body: `${weeklyEventsCount} събития за следващата седмица`,
                actions: [
                  {action: "cancel",title: "cancel"}
                ],
                tag: "weekly-events"
              })
            }
          })
          .catch(err=>{
            console.log(`Error with geting weekly events: ${err}`)
          })
        })

      }
      if(parseTime("09:00") == getTime()){
        //do stuff
        getProfileNotifications().then((notifications)=>{
          if (!notifications["all"]) return
          if (!notification["improvement"]) return
          getYearGrades.then((averageScores)=>{
            let verbesserungSubjects = [];
            for (let sub in averageScores){
              if(averageScores[sub]<4.5){
                verbesserungSubjects.push(sub);
              }
            }
            if(verbesserungSubjects.length > 0){
              let n = self.registration.showNotification("Предмети за подобряване", {
                body: `Трябва да си подобриш успеха по тези предмети: ${verbesserungSubjects}`,
                actions: [
                  {action: "cancel",title: "cancel"}
                ],
                tag: "verbesserung-subjects"
              })
            }
          }).catch(err => {
            console.log(`Error with getting year grades: ${err}`);
          })
        })
      }
    }

    // get period
    if (checkTime == getTime()|| over5s == getTime() || parseTime("04:00")==getTime()) {
      console.log(checkTime, parsedTime, parsedTime - 60*60);
      getScheduleData.then((period)=>{
        console.log("setting first period");
        p = period;
        parsedTime = parseTime(p.startTime);
      }).catch((err)=>{
        console.log(`Error with getting schedule: ${err}`);
        p = undefined;
      })
    }
    //show period notification
    if (p!=undefined && parsedTime - 60*60 == getTime()) { // change (13*60*60 + 0 + 0) + i to getTime()
      i++;
      console.log("should notify");
      getProfileNotifications().then((notifications)=>{
        if (!notifications["all"]) return
        if (!notification["period"]) return
        let n = self.registration.showNotification("Следващ час", {
          body: `Следваш час в ${p.startTime} ч.`,
          actions: [
            {action: "cancel",title: "cancel"}
          ],
          tag: "next-period"
        })
      })
    }
  }, 1000);
})

function getTime() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  return (hour*60*60 + minutes*60 + sec);
  // return (13*60*60 + 0 + 0) - 3;
}

function parseTime(startTime) {
  let time = startTime.split(":");
  return (parseInt(time[0])*60*60 + parseInt(time[1])*60);
}

let getScheduleData = new Promise((resolve, reject)=>{
  let url = "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getSchedule";
  caches.match(url)
    .then(res=>res.json())
    .catch((err)=>{
      //handle err
      reject(err)
    })
    .then(j=>{
      let date = new Date();
      let current_day = date.getDay();
      let schedule = j["schedule"];
      let today_schedule;
      current_day = 3; // To be removed
      // console.log(schedule);
      for(let i=0; i < schedule.length; i++) {
        if(schedule[i].day == current_day) {
          today_schedule = schedule[i];
          break
        }
      }
      if (!today_schedule) reject("Today's schedule is empty");
      let first_period = today_schedule.periods[0];
      resolve(first_period);
    });
})

let getWeeklyEvents = new Promise((resolve, reject)=>{
  let url = "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getWeeklyEvents";
  caches.match(url)
    .then(res=>res.json())
    .catch((err)=>{
      //handle err
      reject(err)
    })
    .then(j=>{
      let weeklyEventsCount = j.weeklyEvents.length;
      // console.log(weeklyEventsCount);
      resolve(weeklyEventsCount);
    });
})

let getYearGrades = new Promise((resolve, reject)=>{
  let url = "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getYearGrades";
  caches.match(url)
    .then(res=>res.json())
    .catch((err)=>{
      //handle err
      reject(err)
    })
    .then(j=>{
      let grades = j.grades;
      let yearGrades = {};
      for(let i = 0; i<grades.length; i++){
        if(Object.keys(yearGrades).includes(grades[i].subject)){
          yearGrades[grades[i].subject].push(grades[i].value);
        }else{
          yearGrades[grades[i].subject] = [grades[i].value];
        }
      }
      let averageScore = {};
      // for(let k = 0; k<Object.keys(yearGrades).length; k++){
        // for(let j = 0; j<yearGrades[k].length; j++){
        //   averageScore[yearGrades[k]].push
        // }
      // }
      for (let sub in yearGrades){
        let subScore = 0;
        for(let j = 0; j<yearGrades[sub].length; j++){
          subScore += yearGrades[sub][j];
        }
        averageScore[sub] = subScore/yearGrades[sub].length;
      }
      // console.log(yearGrades);
      resolve(averageScore);
      // resolve(weeklyEventsCount);
    });
})


function getProfileNotifications() {
  console.log("hello from function")
  return new Promise((resolve, reject) => {
    console.log("hello from promise inside function");
    let url = "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getProfile";
    caches.match(url)
    .then(response=>response.json())
    .catch(err => reject(err))
    .then(object => {
      if(!object["notifications"]) reject("Notifications not found");
      resolve(object["notifications"])
    })
  })
}