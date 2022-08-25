import React, {useEffect, useState} from 'react';
import Sidebar from "../components/sidebar/Sidebar";
import AddTodo from "../components/todo/AddTodo";
import Todo from "../components/todo/Todo";
import {collection, query, onSnapshot, where} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const Home = () => {
    const [user] = useAuthState(auth)
    const [todos, setTodos] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
        if(user) {
            const q = query(collection(db, 'users'), where("uid", "==", user?.uid));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map(doc => {
                    setPhoneNumber(doc.data().phoneNumber)
                })
            })
        }
    },[user])

    const getTodos = async () => {
      const res = await  fetch('http://localhost:8000/todos')
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch resources")
                }
                return res.json()
            })
        setTodos(res)
    }

    useEffect(()=>{
      getTodos()
    },[todos])


    return (
        <div style={{
            padding: '50px 0px 0px 370px'
        }}>
            <div className="row">
                <h1>Todos</h1>
                <AddTodo />
            </div>
            { todos && todos.map((todo) => (<Todo aTodo={todo} key={todo.id} phone={phoneNumber}/>)) }
            <Sidebar/>
        </div>
    );
};

export default Home;
