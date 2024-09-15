import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  } 

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=> {
      return item.id !==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete= (e, id) =>{
    let newTodos = todos.filter(item=> {
      return item.id !==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd= () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange= (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id= e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[85vh] md:w-1/2">
    <h1 className='font-bold text-center text-3xl'>TODO APP : Manage Your Workload Here!</h1>
      <div className="addTodo my-5 flex flex-col gap-3">
        <h2 className='text-xl font-bold'>Add Your Todos</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg p-2 mx-2' />
        <button onClick={handleAdd} disabled={todo.length<=0} className='bg-slate-700 text-white text-sm font-bold hover:bg-slate-950 disabled:bg-slate-700 p-1 px-3 rounded-lg'>Add</button>
        </div>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] bg-slate-700 opacity-75 my-3'></div>
        <h2 className='text-xl font-bold'>Your TODOs</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No TODOs</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex  my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=> {handleEdit(e,item.id)}} className='bg-slate-700 text-white text-sm font-bold hover:bg-slate-950 p-1 px-3 rounded-lg mx-1'><FaEdit /></button>
              <button onClick={(e)=> {handleDelete(e, item.id)}} className='bg-slate-700 text-white text-sm font-bold hover:bg-slate-950 p-1 px-3 rounded-lg mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App