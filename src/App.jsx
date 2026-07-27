import React, {useState, useEffect} from "react";
import {createTask, getAllTasks, updateTaskStatus, updateRunningStatus, resetTask, removeTask} from "./appwrite";
import {ListItem} from "./components/ListItem";
import {getListVideos} from "./pixabayVideos";
import './App.css';

function App() {
   const [tasks, setTasks] = useState([]);
   const [videos, setVideos] = useState([]);
   // const [loadingTasks, setLoadingTasks] = useState(false);

   const loadVideos = async () => {
      try {
         const data = await getListVideos();
         setVideos(data);
      } catch (error) {
         console.log(error);
      }
   };

   const loadAllTasks = async () => {
      try {
         const data = await getAllTasks();
         setTasks(data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      loadVideos().catch(console.error);
      loadAllTasks().catch(console.error);
   }, [])

    const handleCreateTask = async () => {
       try {
            const newTask = await createTask();

            if (newTask) {
                setTasks((prevTasks) => [
                    ...prevTasks,
                    newTask
                ])
            } else {
                await loadAllTasks();
            }
       } catch (error) {
           console.log(error);
       }
    };

    const handleUpdateTaskStatus = async (id, isCompleted, isRunning) => {
       setTasks((prevTasks) => 
          prevTasks.map((task) => 
             task.$id === id ? {
                ...task,
                isCompleted: !isCompleted
             } : task
          )
       )

       try {
          await updateTaskStatus(id, isCompleted, isRunning);
       } catch (error) {
          alert(error);
          loadAllTasks();
       }
    };

    const handleUpdateRunningStatus = async (id, isRunning) => {
       setTasks((prevTasks) => 
          prevTasks.map((task) => 
             task.$id === id ? {
                ...task,
                isRunning: !isRunning
             } : task
          )
       )
       
        await updateRunningStatus(id, isRunning);
        await loadAllTasks();
    };

    const handleResetTask = async (id) => {
        await resetTask(id);
        await loadAllTasks();
    };

    const handleRemoveTask = async (id, taskName) => {
        await removeTask(id, taskName);
        await loadAllTasks();
    }

    return (
        <div>
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
                 <button className={"add-task-btn"} onClick={handleCreateTask}>Add New Task 📝</button>
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
                           updateTaskStatus={() => handleUpdateTaskStatus(item.$id, item.isCompleted, item.isRunning)}
                           updateRunningStatus={() => handleUpdateRunningStatus(item.$id, item.isRunning)}
                           resetTask={() => handleResetTask(item.$id)}
                           removeTask={() => handleRemoveTask(item.$id, item.taskName)}
                        />
                      </div>
                   ))
               }
           </div>
        </div>
    )
}

export default App;