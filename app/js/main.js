'use strict';

var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');

if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(serviceWorkerRegistration) {
    reg = serviceWorkerRegistration;
    subscribeButton.disabled = false;
    console.log('Service Worker is ready :^)', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :^(', error);
  });
}

subscribeButton.addEventListener('click', function() {
  if (isSubscribed) {
    unsubscribe();
  } else {
    subscribe();
  }
});

function subscribe() {
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription) {
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:', sub.endpoint);
    console.log('Subscribed! Endpoint stringify:', JSON.stringify(sub));
    console.log('Subscribed! Endpoint100:', sub.getKey('auth'));
    console.log('Subscribed! Endpoint101:', new Uint8Array(sub.getKey('auth')));
    console.log('Subscribed! Endpoint200:', sub.getKey('p256dh'));
    console.log('Subscribed! Endpoint201:', new Uint8Array(sub.getKey('p256dh')));
    subscribeButton.textContent = 'Unsubscribe';
    //isSubscribed = true;
  });
}

function unsubscribe() {
  sub.unsubscribe().then(function(event) {
    subscribeButton.textContent = 'Subscribe';
    console.log('Unsubscribed!', event);
    isSubscribed = false;
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
    subscribeButton.textContent = 'Subscribe';
  });
}
