import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState} from 'react';
import AddTasks from './components/AddTasks';



const App = () =>{
  const [tasks, setTasks] = useState([
    {
          id: 1,
          text: "The Idea Portal",
          day: "March 3rd at 13:00",
          reminder: 'true'
        },
        {
          id: 2,
          text: "Nako",
          day: 'March 4th at 10:00',
          reminder: 'true'
        },
        {
          id: 3,
          text: "Task scheduler",
          day: "March 17th at 11:00",
          reminder: 'true'
        }]
  )

  //ADD task
    



  // DELETE TASK
const DeleteTask = (id) =>{
  setTasks(tasks.filter(task => task.id !== id))
}

//Toggle reminder 
const ToggleReminder = (id) => {
  setTasks(tasks.map(task => task.id === id ? {...task, reminder: !task.reminder}: task));
}


return(
    <div className="container">
      <Header/>
      <AddTasks/>
      {tasks.length > 0 ? <Tasks onToggle={ToggleReminder} tasks={tasks} onDelete={DeleteTask}/> :
      "No outstanding tasks"}
    </div>
  );
}


export default App;
