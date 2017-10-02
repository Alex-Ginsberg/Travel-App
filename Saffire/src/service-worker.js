(function() {
  'use strict';
  console.log('hitting service-worker');
  self.addEventListener('install', function(event) {
    console.log('Service worker installing...');
    self.skipWaiting();
  });

  self.addEventListener('activate', function(event) {
    console.log('Service worker activating...');
  });

  // I'm a new service worker

  self.addEventListener('fetch', function(event) {
    console.log('Fetching:', event.request.url);
  });

})();
