let version = makeVersion()

let cacheRequests = [
    "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getSchedule"
]

self.addEventListener("install", (e)=>{
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
    // console.log(version);
    // console.log(event.request.url);
    // console.log("getSchedule?",cacheRequests.indexOf(event.request.url) > -1);
    // console.log(".json or .?",checkType(event.request.url));
    event.respondWith(
      fetch(event.request).then(res=>{
        const resClone = res.clone();
        if(event.request.url.startsWith("http")){
            // if(cacheRequests.indexOf(event.request.url) > -1 || checkType(event.request.url)){
                console.log("this is true");
                caches.open(version)
                .then(cache => {
                    // console.log(event.request.url);
                    cache.put(event.request.url, resClone)
                })
                }
                if(!res) {
                console.log(event.request.url, res);
                }
                return res;
            // }
      })
      .catch(err=>{
        // caches.open(version).then(cache=>{
        //   cache.match("https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getSchedule").then(res => {
        //     console.log(res);
        //     return res;
        //   })
        // })
            return caches.match(event.request.url).then(res => res);
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