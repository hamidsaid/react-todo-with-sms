import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddTodo from "./components/todo/AddTodo";
import 'boxicons/css/boxicons.min.css';
import Todo from "./components/todo/Todo";

function App() {
    return (
        <div>
            <div className="">
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='signup' element={<Signup/>}/>
                    <Route path='login' element={<Login/>}/>

                </Routes>
            </div>
        </div>
    );
}

export default App;
