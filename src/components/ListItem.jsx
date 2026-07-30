import { useState, useEffect, useRef } from "react";

export const ListItem = ({
   taskName,
   isCompleted,
   isRunning,
   taskDurationInSeconds,
   videos,
   startTime,
   runningTask,
   updateTaskStatus,
   startTask,
   resetTask,
   removeTask,
}) => {
    const intervalRef = useRef(null);
    const [remainingTime, setRemainingTime] = useState(taskDurationInSeconds);

   useEffect(() => {
      if (!runningTask && !startTime) return;

      intervalRef.current = setInterval(() => {
         const elapsed = Math.floor((Date.now() - startTime)) / 1000;
         const remaining = Math.max(0, remainingTime - elapsed);
         setRemainingTime(remaining);

         if (remainingTime <= 0) {
            clearInterval(intervalRef.current);
            alert(`${taskName} has completed!`);
         }
      }, 1000)

      return () => clearInterval(intervalRef.current);
   }, [isRunning, startTime, taskDurationInSeconds])
    
   
    const timeInHours = Math.floor(remainingTime / 3600);
    const timeInMinutes = Math.floor((remainingTime % 3600) / 60);
    const timeInSeconds = Math.floor(remainingTime % 60);

    return (
        <div className={
           isCompleted ? 'list-task bg-task-completed' :
           'list-task bg-task-uncompleted'}>

           {/*<video autoPlay muted loop playsInline*/}
           {/*   className={isRunning ? 'running-video' : 'hidden'}>*/}
           {/*   {selectedVideo &&*/}
           {/*      <source src={selectedVideo.videos.medium.url} type="video/mp4" />*/}
           {/*   }*/}
           {/*</video>*/}

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
                      onClick={() => {
                       updateTaskStatus();
                       resetTask();
                   }}>{
                   isCompleted ? 'UnDone Task ❌' : 'Done Task ✅'
                   }</button>

                   {
                       isRunning ?
                           <button className={"bg-red-200"}>Pause Task ⏸️</button> :
                           <button className="bg-blue-200" onClick={startTask}>Start Task ▶️</button>
                   }

                   {/*<button className={"reset-task-btn"}*/}
                   {/*   onClick={handleResetTaskAndRunningTime}>*/}
                   {/*   Reset Task🔄*/}
                   {/*</button>*/}

                   <button className={"remove-task-btn"}
                      onClick={removeTask}>
                      Remove Task⛔
                   </button>
               </div>

              <div className="flex justify-center mt-3">
                {
                   // !taskDurationInSeconds ? '' :
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
