import React from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {toggle, removeItem, allRemoveItem} from "../redux/todos/todosSlice";

let filtered = [];

function TodoList(props) {
    const dispatch = useDispatch()
    const items = useSelector((state)=>state?.todos?.items)
    const activeFilter = useSelector((state)=>state.todos.activeFilter)

    filtered = items;
    if(activeFilter !== 'all'){
        filtered = items.filter((todo)=>activeFilter === 'active' ? !todo.completed : todo.completed)
    }

    return (
        <ul className="todo-list">
            {
                filtered.map((item)=>(
                    <li key={item.id} className={item.completed ? 'completed' :''}>
                        <div className="view">
                            <input onChange={()=> dispatch(toggle({id:item.id}))} checked={item.completed } className="toggle" type="checkbox"/>
                            <label>{item.title}</label>
                            <button onClick={()=> dispatch(removeItem({id: item.id}))} className="destroy"></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default TodoList;
