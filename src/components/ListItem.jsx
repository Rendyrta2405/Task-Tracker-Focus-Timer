import {useState, useEffect, useRef} from "react";

export const ListItem = ({ title, onRemove, onDone }) => {
   const [isDone, setIsDone] = useState(false);
   const [isRunning, setIsRunning] = useState(false);
   const [runningTime, setRunningTime] = useState(0);
   
   return (
      <div style={{marginBottom: '20px'}}>
         
         <span style={{textDecoration: isDone ? 'line-through' : ''}}>{title}</span>
         
         <button onClick={() => setIsDone(!isDone)}>{isDone ? 'UnDone Task ❌' : 'Done Task ✅'}</button>
         
         <button>{isRunning ? 'Pause Task ⏸️' : 'Start task ▶️'}</button>
         
         <button>Reset Task🔄</button>
         
         <button onClick={onRemove}>Remove Task⛔</button>
         
         <span>{runningTime}</span>
      </div>
   )
}