import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// const firebaseConfig = {
//   apiKey: import.meta.env.GOOGLE_API_KEY,
//   authDomain: import.meta.env.AUTH_DOMAIN,
//   projectId: import.meta.env.PROJECT_ID,
//   storageBucket: import.meta.env.STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.MESSAGING_SENDER_ID,
//   measurementId: import.meta.env.MEASUREMENT_ID,
//   appId:import.meta.env.APP_ID
// };


const firebaseConfig = {
  apiKey: "AIzaSyDtZpZJptLjKj1lcPs9da0PGmPX4RFrKJ4",
  authDomain: "codebytes-a350b.firebaseapp.com",
  projectId: "codebytes-a350b",
  storageBucket: "codebytes-a350b.appspot.com",
  messagingSenderId: "644936560186",
  appId: "1:644936560186:web:138478782fc0920eae4f03",
  measurementId: "G-QXPZ9H9TQ5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
