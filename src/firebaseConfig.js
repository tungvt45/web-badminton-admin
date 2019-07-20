import firebase from 'firebase/app';
import 'firebase/storage';
const config = {
  apiKey: 'AIzaSyDZz07ZX5yVS84qZkjh-KC_ZuJHts5PSqM',
  authDomain: 'webadmin-babminton.firebaseapp.com',
  databaseURL: 'https://webadmin-babminton.firebaseio.com',
  projectId: 'webadmin-babminton',
  storageBucket: 'webadmin-babminton.appspot.com',
  messagingSenderId: '488176198890',
  appId: '1:488176198890:web:c3ec1254dfedc49e'
};
firebase.initializeApp(config);
const storage = firebase.storage();
export { storage, firebase as default };
