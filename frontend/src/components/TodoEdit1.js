import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react'
// import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const TodoEdit = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

	// Redirect path after save
    const url = '/'
    const todos = useSelector(state => state.todos)
    let todo = todos[todos.findIndex(x => x.id === props.match.params.id)]
    
    if(todo.length < 0){
        history.push(url);
    } else {

    }
    if(!todo.comments){
        todo.comments = ''
    }
    
    // Update form imput if nothing entered in the field 
    useEffect(() => {
		// setNewTodoTitle(todo.title)
		// setNewTodoTitle(todo.description)
		// setNewTodoTitle(todo.comments)
		// setNewTodoTitle(todo.isComplete)
	}, [])


    
    // User input 
    // Title 
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const handleTttleChange = event => setNewTodoTitle(event.target.value)
    // Description
    const [newTodoDescription, setNewTodoDescription] = useState('')
    const handleDescriptionChange = event => setNewTodoDescription(event.target.value)
    // Comments
    const [newTodoComments, setNewTodoComments] = useState('')
    const handleCommentsChange = event => setNewTodoComments(event.target.value)
    // isComplete
    const [newIsComplete, setNewIsComplete] = useState('')
    const handleIsCompleteChange = event => setNewIsComplete(event.target.value)


    //Dispatch to State
    const saveToStore = (data) => dispatch ({
		type: 'ADD_TODO',
		payload: data
    })

	const updateStore = () => {
        if(newTodoTitle === ''){
            setNewTodoTitle(todo.title)
        }
        if(newTodoDescription === ''){
            setNewTodoDescription(todo.description)
        }
        if(newTodoComments === ''){
            setNewTodoComments(todo.comments)
        }
        if(newIsComplete === ''){
            setNewIsComplete(todo.isComplete)
        }

        let putData = {
            id: todo.id,
            title: newTodoTitle,
            description: newTodoDescription,
            comments: newTodoComments,
            isComplete: newIsComplete
        }
        
        console.log(putData)
        

		// if(!newTodoTitle || !newTodoDescription){
		// 	console.log('Not allow')
		// 	//will handle validation and notice
		// } else {
		// 	axios.post('http://localhost:8080/task', {
		// 		title: newTodoTitle,
		// 		description: newTodoDescription
		// 	})
		// 	.then(res => {
		// 		saveToStore(res.data)
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	})
		// 	history.push(url);
		// }
    }
    
    return (
        <div className="container mx-auto px-4">
			<div className="flex items-center h-screen w-full bg-teal-lighter">
 				 <div className="w-full bg-white rounded shadow-lg p-8 m-4">
    				<h1 className="block w-full text-center text-grey-darkest mb-6 uppercase">New Task</h1>
					<div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Task title</label>
						<input type="text"
							onChange = { handleTttleChange }
							className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
							placeholder={ todo.title } />
					</div>
                    <div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Description</label>
						<textarea 
							onChange = { handleDescriptionChange }
							className="border py-2 px-3  text-grey-darkestform-input mt-1 block w-full" 
							rows="3" placeholder={ todo.description } />
					</div>
					<div className="flex flex-col mb-4">
                        {/* <div className = "flex justify-between"> */}
                            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">is completed</label>
                            <input className="mr-2 leading-tight" 
                                onChange = { handleIsCompleteChange }
                                type="checkbox" value ="true" checked = {todo.isComplete}/>
                        {/* </div> */}
					</div>
                    <div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Comments</label>
						<textarea 
							
							onChange = { handleCommentsChange }
							className="border py-2 px-3  text-grey-darkestform-input mt-1 block w-full" 
							rows="3" placeholder={ todo.comments } />
					</div>
					<button 
						className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
						onClick = { updateStore }>
						<div className="px-4 flex justify-end">
							<svg className = "w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  							<path strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
							<span className = "ml-2">
								Update
							</span>
						</div>
					</button>
				</div>
			</div>
		</div>
    )
}

export default TodoEdit

