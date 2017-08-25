import * as firebaseApp from 'firebase';

// should go in a secret file
const config = {
  apiKey: "AIzaSyBaQxPg3FUUAD2pJslbI5cfur3klXdxsiE",
  authDomain: "oauthen-73c30.firebaseapp.com",
  databaseURL: "https://oauthen-73c30.firebaseio.com",
  storageBucket: "oauthen-73c30.appspot.com"

  /* this is for notification from chatApp
  projectId: "chatapp-7ff21",
  messagingSenderId: "687481095544" */
};
firebaseApp.initializeApp(config);

export default firebaseApp;
