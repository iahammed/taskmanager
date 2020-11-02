import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Route, HashRouter, Switch } from "react-router-dom";
// import { Switch } from 'react-dom'
import Header from './components/Header';
import Todos from "./components/Todos";
import TodoEntry from "./components/TodoEntry";
import Todo from "./components/Todo";
import TodoEdit from './components/TodoEdit'
import axios from "axios";

function App() {
	const dispatch = useDispatch()
	//Dispatch to State
    const saveToStore = (data) => dispatch ({
		type: 'ADD_TODO',
		payload: data
    })

	// Populate state from DB at first load 
	// like as componentDidMount in Class Component
	useEffect(() => {
		axios.get('http://localhost:8080/task')
			.then(({data}) => {
				data.forEach(el => {
					saveToStore(el)
				});
			})
			.catch((error) => {
				console.log(error);
			})

	}, [])

    return (
		<HashRouter>
			<div className="App">
				<Header />
				<Switch>
					<Route exact path = '/' component = { Todos }/>
					<Route path = '/newtask' component = { TodoEntry }/>
					<Route path = '/task/:id/edit' component = { TodoEdit } />
					<Route path = '/task/:id' component = { Todo } />
				</Switch>
			</div>
		</HashRouter>
  	);
}

export default App;
