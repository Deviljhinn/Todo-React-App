//Root of the Application
//Manages State inside the application
//useState useRef and useEffect JSX hooks
//npm uuid adds random numbers
import React, { useState, useRef, useEffect, useInsertionEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

//Passed down to Local Storage string
const LOCAL_STORAGE_KEY = 'todoApp.todos'

//Saving built into the Application
function App() {
  //declares todos and sets them?
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  //never recalls since it is an empty array
  //Only called once when the component loads
  //Sets todos to stored todos
  //JSON.parse solves string issue to array
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem
    (LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //Saves todos on page reload
  //array is todos
  //stringify does something
  //localstorage saves to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //Allows boxes to be toggled
  //Takes Id, then toggles from list
  //Creats a copy then sets the new state
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

//(e) event property
//Adds todos to list of todos
//todoNameRef accesses 
//adds variables to print todos
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    //Gives us the previous todos to change, spreads over array and adds to list
    //uuidv4 sets random id for the key
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete:
      false}]
    })
    //Set to null to clear box after todo is set
    todoNameRef.current.value = null
  }

  //Sets incomplete todos
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  //Returns TodoList.js
  //Inputs Add new Todo
  //Adds input button with onClick property pulls from {handleTodo} function above.
  //Input button to clean completed todos
  //todoNameRef is a JSX useRef function 
  //todoNameRef variable created in const above.
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).legnth} left to do</div>
    </>
  )
}

export default App;
