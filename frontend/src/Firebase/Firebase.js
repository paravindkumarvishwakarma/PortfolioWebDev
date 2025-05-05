
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA9NxtSwO7mp8MaSn6RWa5akf_1HzB5Ln4",
  authDomain: "assignment-b6cc9.firebaseapp.com",
  projectId: "assignment-b6cc9",
  storageBucket: "assignment-b6cc9.firebasestorage.app",
  messagingSenderId: "412035185696",
  appId: "1:412035185696:web:9d4a32181e22d3e04dd045",
  measurementId: "G-SFZTTPTXLN"
};

const app = initializeApp(firebaseConfig);                   // initializes Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth , googleProvider };
