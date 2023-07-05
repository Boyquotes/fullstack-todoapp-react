import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/"


function App() {
  const [todos,setTodos] = useState([])
  const[name,setName] = useState('')
  const [currid,setCurrid] = useState(null)
  const [iseditiing,setIsediting] = useState(false)

  useEffect(()=>{
    getTodos()

  },[])

  const getTodos = async()=>{
    try{
      const newTodos = await axios.get(`${BASE_URL}todos`)
      console.log(newTodos)
      setTodos(newTodos.data)

    }catch(err){
      console.log(err)
    }
  }

  const handleAddTodo=async(e)=>{
    e.preventDefault()
    try{
    const res = await axios.post(`${BASE_URL}todos`,{
      name : name
    })
    console.log(res)
    setName('')
    getTodos()

  }catch (err){
    console.log(err)

  }

}


const handleDelete = async (id)=>{
  try {
    const res = await axios.delete(`${BASE_URL}todos/${id}`)
    console.log(res)
    getTodos()
  } catch(error){
    console.log(error)
  }
}
const handleEdit = (id,todoname)=>{
  setCurrid(id)
  setName(todoname)
  setIsediting(true)

}
const handleCancel = ()=>{
  setCurrid(null)
  setName("")
  setIsediting(false)

}
const handleSave = async (e)=>{
  e.preventDefault()
  try {
    const res = await axios.put(`${BASE_URL}todos/${currid}`,{
      name : name
    })
    console.log(res)
    getTodos()
    setCurrid(null)
    setName("")
    setIsediting(false)
  } catch(error) {
    console.log(error)
  }
}
  
  return (
   
      <div className="container">
        <div className="todo-container">
            <h1>MERN STACK TODO APP</h1>

          <form onSubmit={ iseditiing ? handleSave : handleAddTodo}>
            <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
            <button>{ iseditiing ? "Save" : "Add Todo" }</button>
            {iseditiing ? <button onClick={handleCancel}>Cancel</button>: ""}
          </form>
          <ul>
            { iseditiing ? "" :
              todos.map((todo,i)=>(
                <li key = {i}>{todo.name}<button on onClick={()=>handleEdit(todo._id,todo.name)}>Edit</button> <button onClick={()=>handleDelete(todo._id)}>X</button></li>
              ))
            }
          </ul>
        </div>
        
      </div>
  
  )
}

export default App