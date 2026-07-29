import { useState, useEffect, useRef, useMemo } from "react";

export const ListItem = ({
   taskName,
   isCompleted,
   isRunning,
   taskDuration,
   taskDurationInSeconds,
   videos,
   startTime,
   updateTaskStatus,
   startTask,
   updateRunningStatus,
   resetTask,
   removeTask,
}) => {
   // D = 2:00 -> 120s
   
   // S = 7654321 -> 7654s
   // user klik start. lalu pergi 1 mnt 
   // waktu berjalan 1 menit...
   // 120, 119, 118, 62, 61, 60, ...

   // user balik 
   // sisaWaktu = waktuSkrng - waktuMulai  
   // sisaWaktu = 7714321 - 7654321 ->  60000ms -> 60s

   // jalankan sisaWaktu..
   // 60, 59, 58, 3, 2, 1, 0
   
   
    const intervalRef = useRef(null);
    // const taskDurationInSeconds = taskDuration * 60; //60s
    const timeInSeconds = Math.floor(taskDurationInSeconds % 60);
    const timeInMinutes = Math.floor(taskDurationInSeconds / 60 % 60);
    const timeInHours = Math.floor(taskDurationInSeconds / 3600);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);

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
                   !taskDurationInSeconds ? '' :
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
