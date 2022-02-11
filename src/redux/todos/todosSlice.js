import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [{
            id: "1",
            title: "Learn React",
            completed: true
        },
            {
                id: "2",
                title: "Read a book",
                completed: false
            }],
        activeFilter: 'all'
    },
    reducers: {
        addTodo: (state,action) => {
            state.items.push(action.payload)
        },
        toggle: (state,action)=>{
            const {id} = action.payload;

            const item = state.items.find((item)=>item.id === id);
            item.completed = !item.completed
        },
        removeItem: (state,action) => {
            const {id} = action.payload;
            const filterItem = state.items.filter((item)=>(item.id !== id));
            state.items = filterItem
        },
        changeActiveFilter: (state,action) => {
            state.activeFilter = action.payload
        },
        allRemoveItem : (state,action) =>{
            const filter = state.items.filter(item => item.completed === false)
            state.items = filter
        }
    },
});

export const {addTodo, toggle, removeItem, changeActiveFilter ,allRemoveItem} = todosSlice.actions
export default todosSlice.reducer;
