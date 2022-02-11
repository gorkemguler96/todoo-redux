import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addTodo} from "../redux/todos/todosSlice";

function Form(props) {
    const dispatch = useDispatch()
    const [title,setTitle] = useState("")

    const handleSumbit = (e) => {
        e.preventDefault()
        if(title.length){
            const date = new Date().getTime()
            dispatch(addTodo({id:date , title, completed: false}))
            setTitle('')
        }

    }
    return (
        <form onSubmit={handleSumbit}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="new-todo" placeholder="What needs to be done?" autoFocus />
        </form>
    );
}

export default Form;
