import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_XxMk_B-IvUf8M-N6QHnSLQS1u4dgs9E",
  authDomain: "taskmaster-444af.firebaseapp.com",
  databaseURL: "https://taskmaster-444af-default-rtdb.firebaseio.com",
  projectId: "taskmaster-444af",
  storageBucket: "taskmaster-444af.appspot.com",
  messagingSenderId: "547286958166",
  appId: "1:547286958166:web:711f60decf855ed9d23bf7",
  measurementId: "G-6QWD0N6X36"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
