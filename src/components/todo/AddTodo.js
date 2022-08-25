import React, {useState} from 'react';
import Modal from "../modal/Modal";
import Backdrop from "../modal/Backdrop";
import {useNavigate} from "react-router-dom";

const AddTodo = (props) => {
    const navigate = useNavigate();


    const [showModal, setShowModel] = useState(false)
    function displayForm() {
        let authToken = sessionStorage.getItem('Auth Token')

        //check if user is authenticated
        if (authToken) {
            navigate('/')
            setShowModel(true)
        }else{
            alert('Create account or Login to add tasks')
            navigate('/login')
        }
    }
    const handleHideBackdrop = ()=>{
        setShowModel(false)
    }

    return (
       <div>
           <button onClick={displayForm}><i className='bx bx-plus-medical'></i>  Add Task</button>
           {  showModal && <Modal title='Add Task' onCancel={handleHideBackdrop}/> }
           { showModal && <Backdrop onHide={handleHideBackdrop} /> }
       </div>
    );
};

export default AddTodo;
