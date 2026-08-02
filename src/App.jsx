import React, {useState, useEffect} from "react";
import {getListVideos} from "./pixabayVideos";
import {
    createTask,
    getAllTasks,
    updateTaskStatus,
    startTask,
    pauseTask,
    resetTask,
    removeTask
} from "./appwrite";
import {ListItem} from "./components/ListItem";
import './App.css';

function App() {
   const [tasks, setTasks] = useState([]);
   const [videos, setVideos] = useState([]);
   const [loadingTasks, setLoadingTasks] = useState(false);

   const loadAllTasks = async () => {
      try {
          setLoadingTasks(true);
          const data = await getAllTasks();
          setTasks(data);
      } catch (error) {
          alert(error);
      } finally {
          setLoadingTasks(false);
      }
   };

    const loadAllVideos = async () => {
        try {
            const data = await getListVideos();
            if (data) {
                setVideos(data);
            } else {
                setVideos([]);
            }
        } catch (error) {
            console.log("Failed while loadAllVideos with error:", error);
        }
    };

   useEffect(() => {
      loadAllTasks().catch(console.error);
      loadAllVideos().catch(console.error);
   }, [])

    const handleCreateTask = async () => {
         const taskName = prompt('Enter Task Name (Max 255 characters long):');
         if (!taskName) return;
       
         const totalDurationInSeconds = parseInt(prompt('Enter Task Duration In Minutes (Max: 1440 minutes):')) * 60;
         if (!totalDurationInSeconds) return;
         if (totalDurationInSeconds > 86400) {
            return alert('Task duration must not exceed 1.440 minutes. Try again');
         }
       
        const selectedVideo = () => {
            if (videos.length === 0) return null;
            return videos[Math.floor(Math.random() * videos.length)];
        };
        const urlVideo = selectedVideo().videos.medium.url;

       try {
          const newTask = await createTask(taskName, totalDurationInSeconds, urlVideo);

          setTasks((prevTasks) => [
             ...prevTasks,
             newTask
          ])
       } catch (error) {
           console.log("Failed while handleCreateTask with error:", error);
       }
    };

    const handleUpdateTaskStatus = async (id, isCompleted, isRunning) => {
       setTasks((prevTasks) => 
          prevTasks.map((task) => 
             task.$id === id ? {
                ...task,
                isCompleted: !isCompleted,
                isRunning: isRunning ? !isRunning : isRunning,
                startTime: 0,
             } : task
          )
       )

       try {
          await updateTaskStatus(id, isCompleted, isRunning);
       } catch (error) {
          alert(error);
          loadAllTasks().catch(console.error);
       }
    };

    const handleStartTask = async (id) => {
       // const selectedTask = tasks.find(item => item.$id === id);
       const startTime = Date.now();
       
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.$id === id ? {
                    ...task,
                    isRunning: true,
                    startTime: startTime,
                } : task
            )
        )

       // console.log(startTime);

        try {
            await startTask(id, startTime);
        } catch (error) {
            console.log("Failed while handleStartTask with error:", error);
        }
    };
   
    const handlePauseTask = async (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.$id === id ? {
                    ...task,
                    isRunning: false,
                } : task
            )
        )

        try {
            await pauseTask(id);
        } catch (error) {
            console.log("Failed while handlePauseTask with error:", error);
        }
    };

    const handleResetTask = async (id) => {
         setTasks((prevTasks) => 
            prevTasks.map((task) => 
               task.$id === id ? {
                  ...task,
                  isRunning: false,
                  isCompleted: false,
                  startTime: 0
               } : task
            )   
         )

        try {
           await resetTask(id);
        } catch (error) {
           console.log("Failed while handleResetTask with error:", error)
        }
    };

    const handleRemoveTask = async (id, taskName) => {
        await removeTask(id, taskName);
        await loadAllTasks().catch(console.error);
    };

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
                       <p>Go ahead, create a new task—and get it done 🔥</p>
                    </div>
                 : ''
               }
              
               {
                  loadingTasks ? (
                     <img src="/loading/loading.gif" alt="loading..." className="loading-tasks" />
                  ) : 
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
                           taskName={item.taskName}
                           isCompleted={item.isCompleted}
                           isRunning={item.isRunning}
                           totalDurationInSeconds={item.totalDurationInSeconds}
                           urlVideo={item.urlVideo}
                           startTime={item.startTime}
                           runningTask={() => handleRunningTask(item.$id)}
                           pauseTask={() => handlePauseTask(item.$id)}
                           updateTaskStatus={() => handleUpdateTaskStatus(item.$id, item.isCompleted, item.isRunning)}
                           startTask={() => handleStartTask(item.$id)}
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