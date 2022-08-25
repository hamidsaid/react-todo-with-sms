// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getFirestore, collection, addDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCjXLOgUqUyHo8ikjmRPd8LCdXLpbVoKPc",
    authDomain: "fir-tutorial-e92d9.firebaseapp.com",
    databaseURL: "https://fir-tutorial-e92d9-default-rtdb.firebaseio.com",
    projectId: "fir-tutorial-e92d9",
    storageBucket: "fir-tutorial-e92d9.appspot.com",
    messagingSenderId: "1073204238189",
    appId: "1:1073204238189:web:ff03a0e8049ff20c70ec64",
    measurementId: "G-N3JH4X2ZYX"
};

//init app
const app = initializeApp(firebaseConfig)
//init auth
const auth = getAuth(app)
//init db
const db = getFirestore(app)

//create user
const registerUser = async (username, email, phoneNumber, password) => {
    try {
        let user;
       await createUserWithEmailAndPassword(auth, email, password).then(res=>{
           sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
           user = res.user;
       })
        //add a collection of user data to use in SMS Api later
        await addDoc(
            collection(db, "users", ),
            {
                uid: user.uid,
                username,
                phoneNumber,
                email
            })
    } catch (err) {
        console.log(err.message)
        alert('email is already exists')
    }
}

//fetch user details



export { registerUser, auth, db }