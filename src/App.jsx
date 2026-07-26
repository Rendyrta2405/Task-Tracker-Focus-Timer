import React, {useState, useEffect} from "react";
import {createTask, getAllTasks, updateTaskStatus, updateRunningStatus, removeTask} from "./appwrite";
import {ListItem} from "./components/ListItem";
import {getListVideos} from "./pixabayVideos";

import './App.css';

function App() {
   const [tasks, setTasks] = useState([]);
   const [videos, setVideos] = useState([]);

   const loadVideos = async () => {
      try {
         const data = await getListVideos();
         setVideos(data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      loadVideos();
   }, [videos])

   const loadAllTasks = async () => {
      try {
         const data = await getAllTasks();
         setTasks(data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      loadAllTasks();
   }, [tasks])
      
    return (
        <div>
           {/* <p>{videos[0].id}</p> */}
            <h1>
               <span className="text-green-700">
                  📚 Task Tracker
               </span>
               <span className="mx-3 bg-green-500 text-white p-1 inline-block rotate-15">&</span>
               <span className="text-red-800">
                  Focus Timer ⏰
               </span>
            </h1>

            <div className={"container"}>
              <div className="flex justify-between w-full mb-2">
                 <h3 className="text-4xl font-bold honk-system-ui">
                    My Tasks
                 </h3>
                 <button className={"add-task-btn"} onClick={createTask}>Add New Task 📝</button>
              </div>
               {
                 tasks.length === 0 ?
                    <div className={"empty-task"}>
                       <h3>You don't have any task yet ☹️</h3>
                       <p>Go ahead and create a new task—and get it done 🔥</p>
                    </div>
                 : ''
               }
              
               {
                   tasks.map((item, index) => (
                      <div 
                         key={item.$id}  
                         className="task-container">
                         <div className="task-number">
                            <span className="tourney-sans-serif">
                               {index + 1}
                            </span>
                         </div>
                        <ListItem 
                           taskId={item.$id}
                           taskName={item.taskName}
                           isCompleted={item.isCompleted}
                           isRunning={item.isRunning}
                           taskDuration={item.taskDuration}
                           videos={videos}
                           updateTaskStatus={() => updateTaskStatus(item.$id, item.isCompleted, item.isRunning)}
                           updateRunningStatus={() => updateRunningStatus(item.$id, item.isRunning)}
                           removeTask={() => removeTask(item.$id, item.taskName)}
                        />
                      </div>
                   ))
               }
           </div>
        </div>
    )
}

export default App;