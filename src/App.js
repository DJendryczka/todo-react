import { AiOutlinePlus } from 'react-icons/ai';
import Task from './components/Task';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [ tasks, setTask] = useState([])

// Create task

// Read task from firebase

useEffect(() =>{
  const q = query(collection(db, 'tasks'))
  const unsubscribe = onSnapshot(q, (querySnapshot) =>{
    let tasksArr = []
    querySnapshot.forEach((doc) => {
      tasksArr.push({...doc.data(), id: doc.id})
    })
    setTask(tasksArr)
  })
  return () => unsubscribe()
}, [])

// Update task in firebase

// Delete task



  
  return (
    <div className=" bg-gradient-to-r from-slate-500 to-slate-200 h-screen w-screen">
      <div className=" bg-slate-100 max-w-[560px] w-full m-auto rounded-md shadow-xl p-4">
        <h2 className=' text-3xl font-bold text-center text-gray-700 p-2'>Thats you'r tasks</h2>
        <form className=' flex justify-between'>
          <input type='text' placeholder="Add you'r task" className=' border w-full p-2 text-xl'></input>
          <button className=' border p-4 ml-2 bg-orange-600 text-slate-200'><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          { tasks.map( (todo, index) =>(
            <Task key={index} todo={todo} />
          ) )}
        </ul>
        <p className=' text-center p-2 '>You hav 3 tasks</p>
      </div>
    </div>
  )
 
}

export default App;
