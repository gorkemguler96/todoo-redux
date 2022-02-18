import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const getTodosAsync =createAsyncThunk('todos/getTodosAsync/', async () => {
    const res = await axios('http://localhost:7000/todos');
    return await res.data;
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data)=> {
    const res = await axios.post('http://localhost:7000/todos',data);
    return res.data
})

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id)=>{
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id,data})=>{
    const res =await axios.patch(`http://localhost:7000/todos/${id}`,data)
    return res.data
})

export const allRemoveTodoAsync = createAsyncThunk('todos/toggleTodoAsync',async (id)=>{
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error:null,
        activeFilter: 'all'
    },
    reducers: {

        // toggle: (state,action)=>{
        //     const {id} = action.payload;
        //
        //     const item = state.items.find((item)=>item.id === id);
        //     item.completed = !item.completed
        // },
        // removeItem: (state,action) => {
        //     const {id} = action.payload;
        //     const filterItem = state.items.filter((item)=>(item.id !== id));
        //     state.items = filterItem
        // },
        changeActiveFilter: (state,action) => {
            state.activeFilter = action.payload
        },
        allRemoveItem : (state,action) =>{
            const filter = state.items.filter(item => item.completed === false)
            state.items = filter
        }
    },
    extraReducers: {
        //get todos----------------------------------------------------------------------

        [getTodosAsync.pending]: (state,action) => {
            state.isLoading =true;
        },
        [getTodosAsync.fulfilled]: (state,action)=>{
            state.items = action.payload;
            state.isLoading=false;
        },
        [getTodosAsync.rejected] : (state,action)=>{
            state.isLoading=false;
            state.error =action.error.message;
        },
        // addtodo --------------------------------------------------------------
        [addTodoAsync.fulfilled]: (state,action)=>{
            state.items.push(action.payload)
        },
        //removeTodo-----------------------------------------------------------------
        [removeTodoAsync.fulfilled]: (state,action)=>{
            const id = action.payload;
            const filterItem = state.items.filter((item)=>(item.id !== id));
            state.items = filterItem
        },
        //toglee--------------------------------------------------------------------
        [toggleTodoAsync.fulfilled]:(state,action) =>{
            const {id} = action.payload;
            const item = state.items.find((item)=>item.id === id);
            item.completed = !item.completed
        },
        //allremoveitem ---------------------------------------------------------------
        [allRemoveTodoAsync.fulfilled]: (state,action)=> {
            const empty = state.items.map((item)=>item.id )

        }

    }
});

export const {  changeActiveFilter ,allRemoveItem} = todosSlice.actions
export default todosSlice.reducer;
