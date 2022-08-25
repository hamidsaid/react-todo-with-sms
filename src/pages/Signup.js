import React from 'react';
import '../index.css'
import SignupForm from "../components/form/SignupForm";
import { useNavigate} from "react-router-dom"
import {registerUser} from "../firebase";

const Signup = () => {
    const navigate = useNavigate();

    const handleAddUser = (userData) => {

        registerUser(userData.username,userData.email,userData.phoneNumber,userData.password)
        console.log('User added')
        navigate('/')
    }

    return (
        <div className="content">
        <SignupForm  addUser={handleAddUser}/>
        </div>
    );
};

export default Signup;
