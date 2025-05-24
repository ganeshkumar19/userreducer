import React, { useState } from 'react'
import { useReducer } from 'react'

const initialState = []

function reducer (state, action){
  switch(action.type){
    case 'ADD_TASK':
        return [...state, {id: state.length + 1, name: action.payload}]
    case 'DELETE_TASK':
        return state.filter((task)=> task.id !== action.payload)
  }
}
const Todos = () => {
    const [todos, dispatch] = useReducer(reducer, initialState)

    const handleChange = (e)=>{
        if(e.key === 'Enter'){
            dispatch({type: 'ADD_TASK', payload: e.target.value})
        }
    }

    const deleteTask = (id)=>{
        dispatch({type: 'DELETE_TASK', payload: id})
    }
  return (
    <>
    <h3>Task List {todos.length}</h3>
    <label htmlFor='task'>Add task</label>
    <input type='text' id="task" onKeyDown={(e)=>handleChange(e)}/>

    <ul>
        {todos.map(todo=>(
            <li key={todo.id}>
                {todo.name}
                <button onClick={()=> deleteTask(todo.id)}>Delete</button>
            </li>
        ))}
    </ul>
    </>
  )
}

export default Todos