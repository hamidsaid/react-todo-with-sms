import React, {useRef} from 'react';
import Card from "../Card";
import classes from './Form.module.css'
import '../../index.css'
import {Link} from "react-router-dom";
import {useSpring, animated} from "react-spring";

const SignupForm = (props) => {

    const usernameInputRef = useRef()
    const emailInputRef = useRef()
    const phoneNumberRef = useRef()
    const passwordInputRef = useRef()

    //fade animations
    const fadeStyles = useSpring({
        to: { opacity: 1,transform: "translate3d(0%, 0px, 0px)" },
        from: { opacity: 0,transform: "translate3d(0%, -25%, 0px)" },
        delay:100,
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const username = usernameInputRef.current.value;
        const email = emailInputRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const password = passwordInputRef.current.value;

        const newUser = {
            username: username,
            email : email,
            phoneNumber: phoneNumber,
            password: password
        }

        //passing in the new user data
        props.addUser(newUser)

        //redirect

    }

    return (
        <animated.div className={classes.formDiv} style={fadeStyles}>
        <Card>
            <div className={classes.heading}>
                <h3>Create Account</h3>
            </div>
            <form onSubmit={handleSubmit} className={classes.formDiv}>
                <div className={classes.control}>
                    <label>Username</label>
                    <input type='text' placeholder='Enter your username' ref={usernameInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' ref={emailInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label>Phone Number</label>
                    <input type='number' placeholder='Enter your phone number' ref={phoneNumberRef} required/>
                </div>
                <div className={classes.control}>
                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' ref={passwordInputRef} required/>
                </div>
                <div className={classes.msg}>
                    <Link to='/login' className='link'>Already have an account?</Link>
                </div>
                <div className={classes.btn}>
                    <button>Register</button>
                </div>
            </form>
        </Card>
        </animated.div>
    );
};

export default SignupForm;
