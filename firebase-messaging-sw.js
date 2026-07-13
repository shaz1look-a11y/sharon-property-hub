importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Replace with your Firebase config
firebase.initializeApp({
  apiKey:            "AIzaSyCgAusQ4KygDyHOfgwPtluLXRtatjRmuQ0",
  authDomain:        "sharon-property-hub.firebaseapp.com",
  projectId:         "sharon-property-hub",
  storageBucket:     "sharon-property-hub.firebasestorage.app",
  messagingSenderId: "1017385477196",
  appId:             "1:1017385477196:web:fa090abcad0558df2d80e9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(
    payload.notification?.title || 'New Property Enquiry',
    {
      body: payload.notification?.body || 'A new enquiry has come in — open the app to view.',
      icon: '/sharon-property-hub/icon.svg',
      badge: '/sharon-property-hub/icon.svg',
      tag: 'enquiry',
      renotify: true,
      data: { url: '/sharon-property-hub/' }
    }
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/sharon-property-hub/'));
});
