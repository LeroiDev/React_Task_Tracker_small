import React from 'react'
import {useState} from 'react';

const AddTasks = () => {
  const [text, SetText] = useState('');
  const [day, SetDay] = useState('');
  const [reminder, SetReminder] = useState(false);

  return ( 
    <form className="add-form">
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
        <input type="checkbox" value={reminder} onChange={(e)=>SetReminder(e.currentTarget.checked)}/>
      </div>
      <input className="btn btn-block" type="submit" value="Save Task"/>
    </form>
  )
}

export default AddTasks
