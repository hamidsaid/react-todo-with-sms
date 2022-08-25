import Card from "../Card";
import classes from "./Form.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {auth, loginUser} from "../../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSpring, animated} from "react-spring";


const LoginForm = () => {

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();

    //fade animations
    const fadeStyles = useSpring({
        to: { opacity: 1,transform: "translate3d(0%, 0px, 0px)" },
        from: { opacity: 0,transform: "translate3d(0%, -25%, 0px)" },
        delay:100,
    })

    const handleLogin = async (e) => {
        //prevent browser reload behaviour
        e.preventDefault()

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
                    //signed in
                    setCurrentUser(res.user)
                })
        }catch (err){
            console.log(err.message)
            alert('Incorrect Login credentials');
        }

        if(currentUser){
            navigate('/')
        }

    }



    return (
        <animated.div className={classes.formDiv} style={fadeStyles}>

        <Card>
            <div className={classes.heading}>
                <h3>Welcome Back!</h3>
            </div>
            <form onSubmit={handleLogin} className={classes.formDiv}>
                <div className={classes.control}>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' ref={emailInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' ref={passwordInputRef} required/>
                </div>
                <div className={classes.msg}>
                    <p>Not a member? <Link to='/signup' className='link'>Create Account</Link></p>

                </div>
                <div className={classes.btn}>
                    <button>Login</button>
                </div>
            </form>
        </Card>

        </animated.div>
    );
};

export default LoginForm;
