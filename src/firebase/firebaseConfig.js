// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNtamq9-Xq5NUHt47oZ_E7PrP3O9pDTy0",
  authDomain: "assignment-01-7681b.firebaseapp.com",
  projectId: "assignment-01-7681b",
  storageBucket: "assignment-01-7681b.appspot.com",
  messagingSenderId: "299966979715",
  appId: "1:299966979715:web:d90dec6298eaeeec5a45b6",
  measurementId: "G-3NDFRR2K44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export {app , auth};
// const analytics = getAnalytics(app);

export default app;


