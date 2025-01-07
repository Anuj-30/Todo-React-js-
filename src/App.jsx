import { useState, useRef,useEffect } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const submit = useRef();
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [hideFinished, sethideFinished] = useState(true)
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos) 
      settodo("")
      
    }
    
  }, [])
  
  const onAdd = () => {

    //{todo.trim()=="" ? alert("todo cant be blank"):settodos([...todos,{id: uuidv4(), todo,  isCompleted:false}]) }
    // this is a condition wher todo.trim after deducting spaces check empty or not if not  
    // the find item find specefic condition if not it set todos with ...todos for not chhange existing todos array and add id plus todo plus is completed condition
    { todo.trim() == "" ? alert("todo cant be blank") : todos.find((item) => item.todo === todo) ? alert(" todo is duplicate") : settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]) }

    submit.current.innerHTML = "Submit"
    store();
    settodo("")
  }

  const store = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const onEdit=(e, id)=> {
    
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    settodo(todos[index].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    submit.current.innerHTML = "Update"
store();
  }


  const onDelete = (e, id) => {
    // a funtion which gets todo id and event than newtodos variable get value item id becoms null and when we assign it array gets deleted

    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    store();
  }


  const onChange = (e) => {
    settodo(e.target.value)
  }


  const onEnter = (e) => {
    { e.key === "Enter" && onAdd() }
  }

  const onCheckbox = (e) => {
    // function gets e event than id = e name which is id of todo than 
    //index findindex where specefic id is same like our id than new todo create an array which workd with is completed value
    //assign it
    let id = (e.target.name);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
   store();
  }

  const togglehide = () => {
    sethideFinished(!hideFinished)
    
  }
  

  return (
    <>
      <Navbar /> 
      <div className="mx-3 container md:mx-auto bg-gray-200 my-5 p-6 rounded-xl min-h-[80vh] md:w-9/12">

        <div className="addTodo ">
          <h3 className='font-bold text-lg text-slate-600 mb-2'>Task Name</h3>

          <input type='text' onChange={onChange} onKeyUp={onEnter} value={todo} className='w-1/2' ></input>
          <button ref={submit} onClick={onAdd} className='ml-9 bg-slate-500 rounded-lg p-2 text-white text-sm hover:bg-slate-600'>Submit</button>
        </div>
<input type='checkbox' onChange={togglehide} value={hideFinished}/>&nbsp;&nbsp; Hide Finished

        <h3 className='font-bold text-lg text-slate-600 mt-4 mb-3'>Your Todos</h3>


        <div className="todos ">
          {todos.length === 0 && <div className='ms-5'>No todos here</div>}
          {todos.map(item => {




            return ((hideFinished|| !item.isCompleted)&&<div key={item.id} className="todo flex  mt-5 h-auto  justify-between">
              <div className='flex gap-5'>
                <input type="checkbox"  onChange={onCheckbox} value={item.isCompleted} name={item.id} id="" />
            <div className='wrap'><div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div></div></div>
              <div className="buttons  flex gap-7 mx-5 h-full -mt-1">
                <button onClick={(e) => { onEdit(e, item.id) }} className=' bg-slate-500 rounded-lg p-2 text-white text-sm hover:bg-slate-600'>Edit</button>
                {/* button indicate funtion with e parametter and item id directly so we dont need to find it inside function */}
                <button onClick={(e) => { onDelete(e, item.id) }} className=' bg-slate-500 rounded-lg p-2 text-white text-sm hover:bg-slate-600'>Delete</button> </div>
            </div>
            )
          })}
       
        </div>

      </div>



    </>
  )
}

export default App
