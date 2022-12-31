// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAai_C33jcudbDrm68G-JrEodiElQH-0tg",
  authDomain: "chat-app-e5335.firebaseapp.com",
  projectId: "chat-app-e5335",
  storageBucket: "chat-app-e5335.appspot.com",
  messagingSenderId: "498211306992",
  appId: "1:498211306992:web:2c23c11967b65492e87135"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app