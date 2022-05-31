// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyAjRQxkjDs1u0n2CK36UHgF4lV2-o8NBF8",
     authDomain: "netflix-clone-d6550.firebaseapp.com",
     projectId: "netflix-clone-d6550",
     storageBucket: "netflix-clone-d6550.appspot.com",
     messagingSenderId: "170083629742",
     appId: "1:170083629742:web:db88509b4adf4ec7db0b3f"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }