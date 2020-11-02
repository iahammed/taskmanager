const initialState = {
    todos : []
} 

const reducer  = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }
        case 'UPDATE_TODO':
            state.todos[state.todos.findIndex(x => x.id === action.payload.id)] = action.payload
            return {
                ...state,
                todos: [...state.todos],
            }
        
        default:
            return state
    }
}

export default reducer

