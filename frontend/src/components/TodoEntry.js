import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const TodoEntry = () => {
	const dispatch = useDispatch()
	
	const history = useHistory()
	// Redirect path after save
	const url = '/'

	// User input 
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const handleTttleChange = event => setNewTodoTitle(event.target.value)
	// User inpu
    const [newTodoDescription, setNewTodoDescription] = useState('')
    const handleDescriptionChange = event => setNewTodoDescription(event.target.value)

	//Dispatch to State
    const saveToStore = (data) => dispatch ({
		type: 'ADD_TODO',
		payload: data
    })

	const addToList = () => {
		if(!newTodoTitle || !newTodoDescription){
			console.log('Not allow')
			//will handle validation and notice
		} else {
			let postUrl = 'http://localhost:8080/task'
			let postData = {
				title: newTodoTitle,
				description: newTodoDescription
			}
			axios.post(postUrl, postData)
			.then(res => {
				saveToStore(res.data)
			})
			.catch((error) => {
				console.log(error);
			})
			history.push(url);

		}
	}
	
    return (
		<div className="container mx-auto px-4">
			<div className="flex items-center h-screen w-full bg-teal-lighter">
 				 <div className="w-full bg-white rounded shadow-lg p-8 m-4">
    				<h1 className="block w-full text-center text-grey-darkest mb-6 uppercase">New Task</h1>
					<div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Task title</label>
						<input type="text" 
							onChange={ handleTttleChange }
							className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
							placeholder="Title" />
					</div>
					
					<div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Description</label>
						<textarea 
							value = { newTodoDescription }
							onChange = { handleDescriptionChange }
							className="border py-2 px-3  text-grey-darkestform-input mt-1 block w-full" 
							rows="3" placeholder="Enter Description." />
					</div>
					<button 
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick = { addToList }>
						<div className="px-4 flex justify-end">
							<svg className = "w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  							<path strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
							<span className = "ml-2">
								Save
							</span>
						</div>
						
					</button>
				</div>
			</div>
		</div>
    )
}

export default TodoEntry