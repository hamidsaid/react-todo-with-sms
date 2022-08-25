import React, {useRef} from 'react';
import classes from "./Modal.module.css";

const Modal = (props) => {
    const todoTitleRef = useRef()
    const hideModal = props.onCancel

    const handleAddTask = (e) => {
        e.preventDefault()
        //check if props.tod is not empty
        //update it else add a new todo
        if (!props.todo) {
            const todoTitle = todoTitleRef.current.value
            const newTodo = {todoTitle, "completed": false}

            fetch('http://localhost:8000/todos', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTodo)
            }).then((res) => {
                console.log("New Todo added")
                //hide form after adding todo0
                hideModal()
            })
        }else{
            //take new updated values
            const todoTitle = todoTitleRef.current.value;
            const updatedTodo = { todoTitle, "completed":props.todo.completed}
            console.log(updatedTodo)

            //update
            fetch('http://localhost:8000/todos/'+props.todo.id ,{
                method:'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedTodo)
            }).then(res => {
                console.log('Todo updated')
                hideModal()
            })
        }
    }

    //retrieve title for displaying to edit
    let title;
    if(props.todo){
        const todo = props.todo;
        title = todo.todoTitle;
    }


    return (
        <div className={classes.modal} >
            <p>{ props.title }</p>
            <form onSubmit={handleAddTask}>
                <div className={classes.control}>
                <input type="text" ref={todoTitleRef} defaultValue={title} required/>
                </div>
                {props.todo ? <button className='btn'>Save</button> : <button className='btn'>Add</button>}
                <button className={`${classes.btn} ${classes.btnAlt}`} onClick={props.onCancel}>Cancel</button>
            </form>

        </div>
    );
};

export default Modal;
