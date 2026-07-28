import { useState, useEffect, useRef, useMemo } from "react";

export const ListItem = ({
   taskName,
   isCompleted,
   isRunning,
   taskDuration,
   videos,
   updateTaskStatus,
   updateRunningStatus,
   updateStartTime,
   resetTask,
   removeTask,
}) => {
    const intervalRef = useRef(null);
    const timeInSeconds = Math.floor(runningTime % 60);
    const timeInMinutes = Math.floor(runningTime / 60 % 60);
    const timeInHours = Math.floor(runningTime / 3600);
    const selectedVideo = useMemo(() => {
       if (!videos || videos.length === 0) return null;
       return videos[Math.floor(Math.random() * videos.length)];
    }, [videos]);

    const handleStartTask = () => {
        updateStartTime();

    };

    return (
        <div className={
           isCompleted ? 'list-task bg-task-completed' :
           'list-task bg-task-uncompleted'}>

           <video autoPlay muted loop playsInline
              className={isRunning ? 'running-video' : 'hidden'}>
              {selectedVideo &&
                 <source src={selectedVideo.videos.medium.url} type="video/mp4" />
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
                      onClick={() => {
                       updateTaskStatus();
                       setRunningTime(taskDuration * 60);
                       resetTask();
                   }}>{
                   isCompleted ? 'UnDone Task ❌' : 'Done Task ✅'
                   }</button>

                   <button className={
                      isRunning ? 'bg-red-300' :
                      isCompleted ? 'btn-disabled' :
                      'bg-blue-300'}
                      onClick={updateRunningStatus}>
                      {isRunning ? 'Pause Task ⏸️' :
                        runningTime !== taskDuration * 60 ? 'Continue task ▶️' :
                      'Start task ▶️'}
                   </button>

                   <button className={"reset-task-btn"}
                      onClick={handleResetTaskAndRunningTime}>
                      Reset Task🔄
                   </button>

                   <button className={"remove-task-btn"}
                      onClick={removeTask}>
                      Remove Task⛔
                   </button>
               </div>

              <div className="flex justify-center mt-3">
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
