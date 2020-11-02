import React from 'react'
import { useSelector } from 'react-redux';

const Todo = (props) => {
    const todos = useSelector(state => state.todos)
    let todo = todos[todos.findIndex(x => x.id === props.match.params.id)]
    return (
        <div className="max-w-lg rounded overflow-hidden shadow-lg mt-2 border border-purple-200">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{todo.title}</div>
                <p className="text-gray-700 text-base text-justify">
                { todo.description }
                </p>
            </div>
            <div className = "flex justify-between">
                
                <div className="px-4 pt-4 pb-4">
                    
                </div>
                <div className="px-4 pt-4 pb-2">
                    
                </div>
            </div>
        </div>
    )
}
export default Todo