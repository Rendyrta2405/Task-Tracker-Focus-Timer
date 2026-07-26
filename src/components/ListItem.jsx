import {useState, useEffect, useRef} from "react";

export const ListItem = ({
   taskId,
   taskName, 
   isCompleted, 
   isRunning,
   taskDuration, 
   videos,
   updateTaskStatus,
   updateRunningStatus,
   removeTask,
}) => {
    const [runningTime, setRunningTime] = useState(taskDuration * 60);
    const intervalRef = useRef(null);
    const timeInSeconds = Math.floor(runningTime % 60);
    const timeInMinutes = Math.floor(runningTime / 60 % 60);
    const timeInHours = Math.floor(runningTime / 3600);
   
    if (runningTime === 0) {
        alert(`"${taskName}" task has complete 🎉 
        Let's start a new task!`);
        updateRunningStatus(taskId, isRunning);
        setRunningTime(taskDuration * 60);
        updateTaskStatus(taskId, isCompleted);
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setRunningTime((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isRunning])

    const handleResetTask = () => {
        updateRunningStatus(taskId, isRunning);
        setRunningTime(taskDuration * 60);
    };

    return (
        <div 
           className={"list-task"}
           style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${isCompleted ? 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/3e/4e/52/d7/6e/v1_E10/E10JODNM.jpg?w=1000&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=c821a10aa9ad7616cab1f0775ddbf674c277d49dc3001bce999182d079db9a8e' : 'https://cdn.pixabay.com/photo/2016/11/22/23/09/fountain-pen-1851096_1280.jpg'})`
           }}>
           <video autoPlay muted loop playsInline className={isRunning ? 'block' : 'hidden'}>
              <source src={`${videos[Math.floor(Math.random() * videos.length)].videos.medium.url}`} typeof="video/mp4" />
           </video>

           <div className={isRunning ? "content" : ''}>
               <h2 className={
                  isCompleted ? 'jersey-10-charted-regular done-task' :
                  isRunning ? 'running-task jersey-10-charted-regular' :
               'jersey-10-charted-regular text-cyan-500'
               }>{taskName}</h2>
   
               <div className={"container-btn"}>
                   <button className={isCompleted ? 'border border-red-600 text-red-600' : 'bg-green-300'} onClick={updateTaskStatus}>{isCompleted ? 'UnDone Task ❌' : 'Done Task ✅'}</button>
   
                   <button className={
                      isRunning ? 'bg-red-300' : 
                      isCompleted ? 'pointer-events-none bg-gray-300 text-gray-500 opacity-60' : 
                      'bg-blue-300'} 
                      onClick={updateRunningStatus}>
                      {isRunning ? 'Pause Task ⏸️' : 
                        runningTime !== taskDuration * 60 ? 'Continue task ▶️' :
                      'Start task ▶️'}
                   </button>
   
                   <button className={"reset-task-btn"} onClick={handleResetTask}>Reset Task🔄</button>
   
                   <button className={"remove-task-btn"} onClick={removeTask}>Remove Task⛔</button>
               </div>
   
              <div className="flex justify-center">
                {
                   runningTime === taskDuration * 60 ? '' :
                     <span className={"timer"}>
                       {
                        timeInHours.toString().padStart(2, '0') +
                          ' : ' + 
                        timeInMinutes.toString().padStart(2, '0') + 
                          ' : ' + 
                        timeInSeconds.toString().padStart(2, '0')
                        }
                     </span>
                }
              </div>
           </div>
        </div>
    )
}