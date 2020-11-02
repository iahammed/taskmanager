import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik';
 

const TodoEditForm = (props) => {
    const dispatch = useDispatch()
    // Read Store data 
    const todos = useSelector(state => state.todos)
    let todo = todos[todos.findIndex(x => x.id === props.match.params.id)]

    const history = useHistory()
	// Redirect path after save
	const url = '/'
 
    //Dispatch to State
    const saveToStore = (data) => dispatch ({
		type: 'UPDATE_TODO',
		payload: data
    })
    return (
        <div className="container mx-auto px-4">
        <Formik 
            initialValues = {todo}  
            validate = {values => {
                const errors = {};
                return errors;
            }}
            onSubmit = {(values, { setSubmitting }) => {
                let putURL = 'http://localhost:8080/task/' + values.id
                // let putData = JSON.stringify(values)
                axios.put(putURL, values)
                    .then(res => {
                        saveToStore(values) 
                        history.push(url);
                    })
                    .catch((error) => {
                    })
            }}
            onBlur = {(e, values )=> {
                // saveToStore(JSON.stringify(values))
                // alert(JSON.stringify(values));
                // alert()
                // // call the built-in handleBur
                // handleBlur(e)
                // // and do something about e
                // // let someValue = e.currentTarget.value
                // alert('Khaise')
            }} 
             
        >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <div className="container mx-auto px-4">
			<div className="flex items-center h-screen w-full bg-teal-lighter">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4">
                    <h1 className="block w-full text-lg text-center text-grey-darkest mb-6 uppercase">Edit Task</h1>
                    <form onSubmit = { handleSubmit }>
                            
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 uppercase font-bold text-md text-grey-darkest">Task title</label>
                            <input 
                                className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
                                type = "text" 
                                name = "title" 
                                placeholder = "Title"
                                onChange = { handleChange } 
                                onBlur = { e => { saveToStore(JSON.stringify(values))}}
                                value = { values.title } />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 uppercase font-bold text-md text-grey-darkest">Task Descibtion</label>
                            <textarea
                                className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
                                name = "description" 
                                onChange = { handleChange } 
                                onBlur = { handleBlur } 
                                value = { values.description } />
                        </div>
                        <div className="flex flex-col mb-4">
                            <div className = "flex justify-end">
                            <label className="mb-2 uppercase font-bold text-md text-grey-darkest">Completed</label>
                            <input type = "checkbox"
                                className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
                                name = "isComplete" 
                                onChange = { handleChange } 
                                onBlur = { handleBlur } 
                                value = { values.isComplete } />
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="mb-2 uppercase font-bold text-md text-grey-darkest">Comment</label>
                            <textarea
                                className="border py-2 px-3 text-grey-darkestform-input mt-1 block w-full" 
                                name = "comments" 
                                onChange = { handleChange } 
                                onBlur = { e => { 
                                    saveToStore(values)
                                }} 

                                value = { values.comments } 
                                />
                        </div>

                        <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            disabled = { isSubmitting }>Submit</button>

                            <pre>{JSON.stringify(values)}</pre>

                    </form>
                </div>
            </div>
        </div>
        )}
        </Formik>
    </div>
    )
}
export default TodoEditForm
