import React, { useState} from 'react';
import Card from "../Card";
import Modal from "../modal/Modal";
import Backdrop from "../modal/Backdrop";
import beemSms from "../../beemSms";


const Todo = (props) => {

    const id = props.aTodo.id;
    const [isCompleted, setIsCompleted] = useState(props.aTodo.completed)
    const [showModal, setShowModel] = useState(false)
    const [todoObj, setTodoObj] = useState('')

    const handleHideBackdrop = ()=>{
        setShowModel(false)
    }
    const handleEdit = () => {
        //show form
        setShowModel(true)

        //fetch resource to edit
        fetch('http://localhost:8000/todos/'+id)
            .then(res=>res.json())
            .then(data=> setTodoObj(data) )
    }
    const handleDelete = () => {
        fetch('http://localhost:8000/todos/'+id,{
            method:'DELETE'
        }).then(()=>{
            console.log('successfully deleted')
        })
    }


    const handleCompleted = () => {
        setIsCompleted(!isCompleted)
        if(!isCompleted) beemSms(props.aTodo.todoTitle,props.phone)
    }

    return (
        <div className='todoCard'>
            <Card>
                <div className='task-tile'>
                    <p>{ props.aTodo.todoTitle} </p>
                    <div className='icons'>
                        <div onClick={handleEdit}>
                            <i className='bx bx-pencil bx-sm'></i>
                        </div>
                        <div onClick={handleDelete}>
                            <i className='bx bx-trash bx-sm'></i>
                        </div>
                        <div onClick={handleCompleted}>
                            { isCompleted ?
                                <i className='bx bxs-check-circle bx-sm'></i> :
                                <i className='bx bx-check-circle bx-sm'></i>
                            }
                        </div>
                    </div>
                </div>
            </Card>
            {  showModal && <Modal title='Edit Task' onCancel={handleHideBackdrop} todo={todoObj}/> }
            { showModal && <Backdrop onHide={handleHideBackdrop} /> }
        </div>
    );
};

export default Todo;
