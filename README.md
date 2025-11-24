# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.











////////////////////////////////////////////////////////////////////////////////////



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtZpZJptLjKj1lcPs9da0PGmPX4RFrKJ4",
  authDomain: "codebytes-a350b.firebaseapp.com",
  projectId: "codebytes-a350b",
  storageBucket: "codebytes-a350b.firebasestorage.app",
  messagingSenderId: "644936560186",
  appId: "1:644936560186:web:138478782fc0920eae4f03",
  measurementId: "G-QXPZ9H9TQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






















 <label className="swap swap-rotate hover:text-[#ff6200]">
            {/* this hidden checkbox controls the state */}
            {/* <input type="checkbox" className="theme-controller " value="light" /> */}

            {/* sun icon */}
            <Sun className="swap-off h-8 w-8 fill-current"/>

            {/* moon icon */}
            <Moon  className="swap-on h-8 w-8 fill-current"/>
            </label>