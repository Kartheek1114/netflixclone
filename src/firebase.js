
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyA1jYT5IyLOmZ1HUzn97_SGKcEdqcu0lg4",
  authDomain: "netflixclone-23848.firebaseapp.com",
  projectId: "netflixclone-23848",
  storageBucket: "netflixclone-23848.firebasestorage.app",
  messagingSenderId: "555568635821",
  appId: "1:555568635821:web:f7e46f81ac0e8833b20b24"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
const res = await createUserWithEmailAndPassword(auth, email, password);
const user = res.user;
await addDoc(collection(db,"user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
})
    }catch(error){
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email,password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password)
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const logout = () => {
    signOut(auth);
}
export { auth, db, signup, login, logout };