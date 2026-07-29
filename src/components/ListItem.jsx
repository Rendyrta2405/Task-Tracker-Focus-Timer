import { useState, useEffect, useRef, useMemo } from "react";

export const ListItem = ({
   taskName,
   isCompleted,
   isRunning,
   taskDuration,
   videos,
   startTime,
   updateTaskStatus,
   startTask,
   updateRunningStatus,
   resetTask,
   removeTask,
}) => {
    const intervalRef = useRef(null);
    const TOTAL_DURATION = taskDuration * 60; //60
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const timeInSeconds = Math.floor(elapsed % 60);
    const timeInMinutes = Math.floor(elapsed / 60 % 60);
    const timeInHours = Math.floor(elapsed / 3600);

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
                       // setRunningTime(taskDuration * 60);
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
                   // runningTime === taskDuration * 60 ? '' :
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
