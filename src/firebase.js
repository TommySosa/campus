// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJYlrlprvnjDUJLjMpqgH6DgyTI6CfhyA",
  authDomain: "campus-utn.firebaseapp.com",
  projectId: "campus-utn",
  storageBucket: "campus-utn.appspot.com",
  messagingSenderId: "1049468065197",
  appId: "1:1049468065197:web:fa1c0313f0e9b1afd2bd24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

// export function uploadFile(file){
//     const storageRef = ref(storage, 'test')
//     uploadBytes(storageRef, file).then(snapshot => {
//         console.log(snapshot);
//     })
// }