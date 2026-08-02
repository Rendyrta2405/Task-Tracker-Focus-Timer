import { useState, useEffect, useRef } from "react";

export const ListItem = ({
   taskName,
   isCompleted,
   isRunning,
   totalDurationInSeconds,
   urlVideo,
   startTime,
   runningTask,
   updateTaskStatus,
   startTask,
   pauseTask,
   resetTask,
   removeTask,
}) => {
    const intervalRef = useRef(null);
    const [remainingTime, setRemainingTime] = useState(totalDurationInSeconds);

   useEffect(() => {
      if (isCompleted) {
         setRemainingTime(totalDurationInSeconds);
         clearInterval(intervalRef.current);
         return;
      }

      if (!isRunning && !isCompleted && !startTime) {
         setRemainingTime(totalDurationInSeconds);
         clearInterval(intervalRef.current);
         resetTask();
         return;
      }
      
      if (!isRunning) return;

      intervalRef.current = setInterval(() => {
         const elapsed = Math.floor((Date.now() - startTime)) / 1000;
         const remaining = Math.max(0, remainingTime - elapsed);
         setRemainingTime(remaining);

         if (remaining <= 0) {
            alert(`"${taskName}" task has completed 🥳
Let's start a new task and get it finished 🔥`);
            clearInterval(intervalRef.current);
            setRemainingTime(totalDurationInSeconds);
            updateTaskStatus();
         }
      }, 1000)

      return () => clearInterval(intervalRef.current);
   }, [isRunning, isCompleted, startTime])
    
   
    const timeInHours = Math.floor(remainingTime / 3600);
    const timeInMinutes = Math.floor((remainingTime % 3600) / 60);
    const timeInSeconds = Math.floor(remainingTime % 60);

    return (
        <div className={
           isCompleted ? 'list-task bg-task-completed' :
           'list-task bg-task-uncompleted'}>

           <video autoPlay muted loop playsInline
              className={isRunning ? 'running-video' : 'hidden'}>
              {urlVideo &&
                 <source src={urlVideo} type="video/mp4" />
              }
           </video>

           <div className={ isRunning ? "content" : 'bg-task-not-running'}>

               <h2 className={
                  isCompleted ? 'task-name-done jersey-10-charted-regular' :
                  isRunning ? 'task-name-running jersey-10-charted-regular' :
               'task-name-not-running jersey-10-charted-regular'
               }>{taskName}</h2>

               <div className="container-btn">
                   <button className={
                   isCompleted ? 'btn-task-completed' :
                   'bg-green-300'}
                      onClick={updateTaskStatus}>{
                   isCompleted ? 'UnDone Task ❌' : 'Done Task ✅'
                   }</button>

                   {
                       isRunning ?
                           <button 
                              className={"bg-red-200"}
                              onClick={pauseTask}>
                              Pause Task ⏸️
                           </button> :
                           <button 
                              className={`${isCompleted ? 'btn-disabled' : 'bg-blue-200'}`}
                              onClick={startTask}>
                              {remainingTime !== totalDurationInSeconds ? 
                              'Continue Task ▶️' : 
                              "Start Task ▶️"}
                           </button>
                   }

                   <button className={"reset-task-btn"}
                      onClick={resetTask}>
                      Reset Task🔄
                   </button>

                   <button className={"remove-task-btn"}
                      onClick={removeTask}>
                      Remove Task⛔
                   </button>
               </div>

              <div className="flex justify-center mt-3">
                {
                   remainingTime === totalDurationInSeconds || remainingTime === 0 || startTime === 0 ? '' :
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
