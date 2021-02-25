import React from 'react'
import {useState} from 'react';

const AddTasks = ({addTask}) => {
  const [text, SetText] = useState('');
  const [day, SetDay] = useState('');
  const [reminder, SetReminder] = useState(false);

  const OnSubmit = (e) =>{
    e.preventDefault();

    if(!text){
      alert("Please add a task");
      return;
    }
    addTask({text,day,reminder})

      SetText("");
      SetDay("");
      SetReminder(false);

  }

  return ( 
    <form className="add-form" onSubmit={OnSubmit}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input type="text" placeholder="Add a task..."
          value={text} onChange={(e)=>SetText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Day & Time</label>
        <input type="text"  placeholder="Add a date..."
          value={day} onChange={(e)=>SetDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input type="checkbox" 
        value={reminder} 
        onChange={(e)=>SetReminder(e.currentTarget.checked)}
        checked={reminder}
        />
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  )
}

export default AddTasks
