// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
     getAuth,
     signInWithEmailAndPassword,
     signOut,
     signInWithPopup,
     GoogleAuthProvider,
     createUserWithEmailAndPassword,
     sendPasswordResetEmail
    } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'    

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIWseT-eyfXpRbYVmd9i6cFmyvSXkx86I",
  authDomain: "proyecto-integrador-dh-86737.firebaseapp.com",
  projectId: "proyecto-integrador-dh-86737",
  storageBucket: "proyecto-integrador-dh-86737.appspot.com",
  messagingSenderId: "1037228023061",
  appId: "1:1037228023061:web:e386cd913338e1de919d1c"
};

// Initializo Firebase
const app = initializeApp(firebaseConfig);

//Inicializo servicio Auth en Firebase
const auth = getAuth(app)

//Inicializo Base de Datos
export const db = getFirestore(app)

//LOGIN
export const onSignIn = async ( {email, password} ) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        console.log(error)
    }
}

//LOGOUT
export const logOut = ()=>{
    signOut(auth)
}

//LOGIN CON GOOGLE
//Primero debo inicializar una instancia de Google Provider
let googleProvider = new GoogleAuthProvider()

export const loginGoogle = async ()=>{
    const res = await signInWithPopup(auth, googleProvider)
    return res
}

//REGISTRARSE
export const signUp = async ({email, password})=> {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        console.log(error)
    }
}

//OLVIDE CONTRASEÑA
export const forgotPassword = async (email)=>{
    let res = await sendPasswordResetEmail(auth, email)
    return res
}
 
 