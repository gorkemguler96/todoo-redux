import {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import {toggleTodoAsync, getTodosAsync,removeTodoAsync} from "../redux/todos/todosSlice";
import Loading from "./Loading";

let filtered = [];

function TodoList(props) {
    const dispatch = useDispatch()
    const items = useSelector((state)=>state?.todos?.items)
    const activeFilter = useSelector((state)=>state.todos.activeFilter)
    const isLoading = useSelector((state)=>state.todos.isLoading)
    const error =useSelector((state)=>state.todos.error)

    useEffect(()=>{
        dispatch(getTodosAsync());
    },[dispatch])

    const handleRemove = async (id)=> {
        await dispatch(removeTodoAsync(id))
    }
    const handleToggle = async (id,completed)=>{
        await dispatch(toggleTodoAsync({id, data: {completed}}))
    }

    filtered = items;
    if(activeFilter !== 'all'){
        filtered = items.filter((todo)=>activeFilter === 'active' ? todo.completed : todo.completed)
    }
    if(isLoading){
        return <Loading/>
    }
    if(error){
        return <div>error</div>
    }

    return (
        <ul className="todo-list">
            {
                filtered.map((item)=>(
                    <li key={item.id} className={item.completed ? 'completed' :''}>
                        <div className="view">
                            <input onChange={()=> handleToggle(item.id, !item.completed)} checked={item.completed } className="toggle" type="checkbox"/>
                            <label>{item.title}</label>
                            <button onClick={()=> handleRemove(item.id)} className="destroy"></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default TodoList;
