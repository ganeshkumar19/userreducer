import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todos from './components/Todos'
import StateApp from './components/StateApp'
import Shape from './components/Shape'
import ButtonComponent from './components/ButtonComponent'
import PopUp from './components/PopUp'

function App() {

  const data = [
    [1,1,1],
    [1,0,0],
    [1,1,1]
  ]

  return (
    <>
      <PopUp/>
    </>
  )
}

export default App
