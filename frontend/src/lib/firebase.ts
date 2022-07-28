import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_98Av6wlj8lg8WowQKU6EN3Al717a_VE",
  authDomain: "e-webshopapp.firebaseapp.com",
  projectId: "e-webshopapp",
  storageBucket: "e-webshopapp.appspot.com",
  messagingSenderId: "637626490885",
  appId: "1:637626490885:web:8c32fe56ed8b67a155fc6c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { auth }