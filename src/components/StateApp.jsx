import React, { useReducer } from 'react'


const initalState = []

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_ITEM":
            return [...state, {id: state.length+ 1, name: action.payload}]
        case "DELETE_ITEM":
            return state.filter((product)=> product.id !== action.payload)
        case "UPDATE_ITEM":
            return state.map(item=> item.id === action.payload.id ? {...item, name: action.payload.name}: item)
        default:
            return state; 
    }
}


const StateApp = () => {
    const [items, dispatch] = useReducer(reducer, initalState)

    const addItem = (itemName)=>{
      dispatch({type: 'ADD_ITEM', payload: itemName})
    }
    const deleteItem = (itemId)=>{
      dispatch({type: 'DELETE_ITEM', payload: itemId})
    }
    const updateItem = (itemId, itemName)=>{
        dispatch({type: 'UPDATE_ITEM', payload: {id: itemId, name: itemName}})
    }
  return (
    <>
    <h3>Products List</h3>
    <button onClick={()=> addItem(prompt("enter the product name"))}>Add Item</button>
    <ul>
        {items.map(item=>(
            <li key={item.id}>
                {item.name}
                <button onClick={()=>updateItem(item.id, prompt("enter the product name", item.name))}>Update</button>
                <button onClick={()=>deleteItem(item.id)}>Delete</button>
            </li>
        ))}
    </ul>
    </>
  )
}

export default StateApp