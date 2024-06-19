// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
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
        return { success: true, data: res };
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
}

//OLVIDE CONTRASEÑA
export const forgotPassword = async (email)=>{
    let res = await sendPasswordResetEmail(auth, email)
    return res
}
 
// Subir imagen
const storage = getStorage(app);

export const uploadToFirebase = async (file, path) => {
    try {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(userRef);
        const users = querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserByEmailFirebase = async (email)=>{
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data();
        const uid = userDoc.id; // Obtén el UID del documento
        return { ...user, uid };
    } catch (error) {
        return null;
        throw error;
    }
}

// Cambiar rol de usuario
export const changeUserRole = async (uid, newRole) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const res = await setDoc(userDocRef, { rol: newRole }, { merge: true });
        return true;
    } catch (error) {
        return null;
        throw error;
    }
}