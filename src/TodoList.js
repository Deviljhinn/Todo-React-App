import React from 'react'
import Todo from './Todo'

//Todos referenced here then to app

//Renders Todos that change
//Make sure Key is unique for the array
//Key allows React to only change components that actually change
//Instead of refreshing and clearing the whole page
export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}
