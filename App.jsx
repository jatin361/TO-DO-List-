import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([]);
  const [showFinish, setshowFinish] = useState(true)

const toggleFinshed = (e) => {
  setshowFinish(!showFinish)
}



 useEffect(() => {
    const savedTodos = localStorage.getItem("todos")

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])


  // const saveToLS = (params) => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }
   
  const handleEdit = (e, id) =>  {
     let t = todos.filter(i=>i.id === id)
     setTodo(t[0].todo)
      let newTodos = todos.filter(item =>{
      return item.id!== id 
      })
      setTodos(newTodos)
      saveToLS()
  }

  const handleDelete = (e , id) => {
     let newTodos = todos.filter(item =>{
      return item.id!== id 
  })
  setTodos(newTodos)
  saveToLS()
  }
    
  const handleAdd = () => {
    setTodos([...todos , {id: uuidv4() , todo , isCompleted:false}]) 
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
   setTodo(e.target.value) 

  }

  const handleCheckbox =  (e) => {
    let id = e.target.name; 
    let index = todos.findIndex(item =>{
      return item.id === id;
    })

    let newTodos  = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted ;
    setTodos(newTodos)
    saveToLS()
  }
  


  return (
    <>
      <Navbar/>
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] bg-violet-400 md:w-1/2">
      <h1 className='font-bold text-center text-xl '>iTask - Manage Your todos at one place </h1>
        <div className="addtodo my-5 flex flex-col gap-4 ">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='bg-white w-1/1 rounded-full p-5 py-1 ' type="text"  />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600  hover:bg-violet-900 p-3 text-sm font-bold py-1 text-white rounded-md  disabled:bg-violet-600 w-full' >Save</button>
        </div>
        <input onChange={toggleFinshed} type="checkbox" checked={showFinish} /> Show Finished
        <h2 className='text-lg font-bold'>Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold'>No Todos to Display</div> }
          {todos.map(item=>{
          return(showFinish || !item.isCompleted)&& <div key={item.todo} className="todo flex  sm:flex-row sm:items-center justify-between gap-3 w-full sm:w-3/4 lg:w-2/3 my-3">
            <div className=' flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-600 hover:bg-violet-900 p-3 text-sm font-bold py-1 text-white rounded-md mx-4 '><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-600  hover:bg-violet-900 p-3 text-sm font-bold py-1 text-white rounded-md mx-4'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
