import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import TodoEntry from "./TodoEntry";

const Todos = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const handleDeleteClick = id => dispatch({
        type: 'DELETE_TODO',
        payload: id
    })
    const handleUpdateClick = id => dispatch({
        type: 'UPDATE_TODO',
        payload: {
            title: 'New todo title', 
            describtion : 'New todo description',
            id: id,
            update_at: 'now'
        },
    })
    const manageTask = (id, update = '') => {
        // console.log(id)
        if (!update){
            let url = 'http://localhost:8080/task/' + id
            axios.delete(url)
                .then(res => {
                    handleUpdateClick(id)                   
                })
                .catch((error) => {
                    console.log(error);
                })
            handleDeleteClick(id)
        } else {
            handleUpdateClick(id)
        }
    }
    if(!todos || !todos.length ) {
        return (
            <TodoEntry />
        )
    }
    return (
        <div className="container flex justify-start  mx-auto px-4 py-4">
            <ul>
                {todos.map(todo => (
                    // <li key={todo.id} onClick = {()=>handleClick(todo.id)}>
                    <li key={todo.id}>
                    <div className="max-w-lg rounded overflow-hidden shadow-lg mt-2 border border-purple-200">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{todo.title}</div>
                            <p className="text-gray-700 text-base text-justify">
                            { todo.description }
                            </p>
                            
                            { !todo.isComplete &&
                            <p className="text-red-700 text-base text-justify">
                            Not Completed {todo.length}
                            </p>
                            }
                            { todo.isComplete &&
                            <p className="text-green-700 text-base text-justify">
                            Completed {todo.length}
                            </p>
                            }
                        </div>
                        <div className = "flex justify-between">
                            <div className="px-4 pt-4 pb-4">
                                <Link to={'/task/' +  todo.id } 
                                    param = {todo.id}
                                    className="inline-block bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-200 hover:border-transparent rounded">    
                                    <div className="px-4 flex justify-end">
                                        <svg className = "w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        <span className = "ml-2">
                                            Detail
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            <div className="px-4 pt-4 pb-4">
                                <Link to={'/task/' +  todo.id + '/edit'} 
                                    className="inline-block bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded"> 
                                    <div className="px-4 flex justify-end">
                                        <svg className = "w-4" fill="none"  viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span className = "ml-2">Edit</span>
                                    </div>
                                    
                                </Link>
                            </div>
                            <div className="px-4 pt-4 pb-2">
                                <button 
                                    className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-200 hover:border-transparent rounded"
                                    onClick = {()=>manageTask(todo.id)}>
                                    <div className="px-4 flex justify-end">
                                        <svg className = "w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>                                   
                                        <span className = "ml-2">Delete</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    </li>
                    ) 
                )}
            </ul>
        </div>
    )
}

export default Todos