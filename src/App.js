import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState,useEffect} from 'react';
import AddTasks from './components/AddTasks';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () =>{
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  //when page loads - note underneath useState - note useEffect cannot be async make 
  //make an async function then and call it with useEffect - note dependancy array
  useEffect(()=>{
      const GetTasksFromServer = async () =>{
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      }
      GetTasksFromServer();
  },[]);

  //move fetchTasks outside of useEffect for reusability 
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  //fetch single task to toggle reminder 
  const fetchSingleTask = async (ID) =>{
    const res = await fetch(`http://localhost:5000/tasks/${ID}`);
    const data = await res.json();
    return data;
  }



  //ADD task - ID created manually because there is no backend to get it from 
    // const AddTask = (task) =>{
    //     const ID = Math.floor(Math.random() * 100000 + 1);
    //     const newTask = {ID, ...task}
    //     setTasks([...tasks,newTask]);
    //   }
//NOW add task to server note server creates an idea 
const AddTask = async (task)=>{
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
      body: JSON.stringify(task)        
  });

  const data = await res.json();

  setTasks([...tasks, data]);

}



  // DELETE TASK
// const DeleteTask = (id) =>{
//   setTasks(tasks.filter(task => task.id !== id))
// }
//NOW DELETE FROM SERVER 
const DeleteTask = async (ID) =>{
  await fetch(`http://localhost:5000/tasks/${ID}`,{
    method: 'DELETE',
  });
  
  setTasks(tasks.filter(task => task.ID !== ID));
}



//Toggle reminder - async now when backend added to toggle 
const ToggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id);
    const updatedTaksToggle = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTaksToggle) 
  })

  const data = await res.json();


   setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder}: task));
}

//note in render the () and not {} still catches me ! 
return(
  <Router>
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} 
      showAdd={showAddTask}
      />
      <Route path="/" exact render={(props)=>(
         <>
      {showAddTask && <AddTasks addTask={AddTask}/>}
      {tasks.length > 0 ? <Tasks onToggle={ToggleReminder} tasks={tasks} onDelete={DeleteTask}/> :
      "No outstanding tasks"}
         </>
      )}/>
      <Route path="/about" component={About}/> 
    <Footer/>
    </div>
    </Router>
  );
}


export default App;
