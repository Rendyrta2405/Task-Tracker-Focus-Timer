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
   resetTask,
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
        resetTask();
        setRunningTime(taskDuration * 60);
        updateTaskStatus();
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

    const handleResetTaskAndRunningTime = () => {
        resetTask(taskId);
        setRunningTime(taskDuration * 60);
    };

    return (
        <div 
           className={isCompleted ? 'list-task bg-task-completed' : 'list-task bg-task-uncompleted'}>
           <video autoPlay muted loop playsInline className={isRunning ? 'block' : 'hidden'}>
              <source src={`${videos[Math.floor(Math.random() * videos.length)].videos.medium.url}`} typeof="video/mp4" />
           </video>

           <div className={isRunning ? "content text-wrap" : 'bg-task-not-running text-wrap'}>
               <h2 className={
                  isCompleted ? 'jersey-10-charted-regular task-name-done' :
                  isRunning ? 'task-name-running jersey-10-charted-regular' :
               'task-name-not-running jersey-10-charted-regular'
               }>{taskName}</h2>

               <div className={"container-btn"}>
                   <button className={isCompleted ? 'border border-red-600 text-red-600' : 'bg-green-300'} onClick={() => {
                       updateTaskStatus();
                       setRunningTime(taskDuration * 60);
                       resetTask();
                   }}>{isCompleted ? 'UnDone Task ❌' : 'Done Task ✅'}</button>
   
                   <button className={
                      isRunning ? 'bg-red-300' : 
                      isCompleted ? 'pointer-events-none bg-gray-300 text-gray-500 opacity-60' : 
                      'bg-blue-300'} 
                      onClick={updateRunningStatus}>
                      {isRunning ? 'Pause Task ⏸️' : 
                        runningTime !== taskDuration * 60 ? 'Continue task ▶️' :
                      'Start task ▶️'}
                   </button>
   
                   <button className={"reset-task-btn"} onClick={handleResetTaskAndRunningTime}>Reset Task🔄</button>
   
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