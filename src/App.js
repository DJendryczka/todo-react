import { AiOutlinePlus } from "react-icons/ai";
import Task from "./components/Task";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const [tasks, setTask] = useState([]);
  const [input, setInput] = useState("");

  // Create task

  const createTask = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid task");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read task from firebase

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTask(tasksArr);
    });
    return () => unsubscribe();
  }, []);

  // Update task in firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "tasks", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete task
const deleteTask = async(id) =>{
  await deleteDoc(doc(db, 'tasks', id))
}


  return (
    <div className=" bg-gradient-to-r from-slate-500 to-slate-200 h-screen w-screen p-7">
      <div className=" bg-slate-100 max-w-[560px] w-full m-auto rounded-md shadow-xl p-4 ">
        <h2 className=" text-3xl font-bold text-center text-gray-700 p-2">
          Thats you'r tasks
        </h2>
        <form onSubmit={createTask} className=" flex justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add you'r task"
            className=" border w-full p-2 text-xl"
          ></input>
          <button className=" border p-4 ml-2 bg-orange-600 text-slate-200">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {tasks.map((todo, index) => (
            <Task key={index} todo={todo} toggleComplete={toggleComplete} deleteTask={deleteTask} />
          ))}
        </ul>
        {tasks.length < 1 ? null : <p className=" text-center p-2 ">{`You have ${tasks.length} tasks`}</p> }
       
      </div>
    </div>
  );
}

export default App;
