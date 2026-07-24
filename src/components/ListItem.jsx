import {useState, useEffect, useRef} from "react";

export const ListItem = ({ title, onRemove }) => {
    const [isDone, setIsDone] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [runningTime, setRunningTime] = useState(0);
    const intervalRef = useRef(null);
    const timeInSeconds = Math.floor(runningTime % 60);
    const timeInMinutes = Math.floor(runningTime / 60);

    if (timeInMinutes === 1) {
        alert("Task complete🎉 Let's start a new task!");
    }

    const handleDoneTask = () => {
        setIsDone(!isDone);
        handleResetTask();
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setRunningTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isRunning])

    const handleResetTask = () => {
        setIsRunning(false);
        setRunningTime(0);
    };

    return (
        <div className={"list-task"}>
            <h2 className={isDone ? 'line-through' : ''}>{title}</h2>

            <div className={"container-btn"}>
                <button className={isDone ? 'border border-red-400 text-red-400' : 'bg-green-300'} onClick={handleDoneTask}>{isDone ? 'UnDone Task ❌' : 'Done Task ✅'}</button>

                <button className={isRunning ? 'bg-red-300' : 'bg-blue-200'} onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause Task ⏸️' : 'Start task ▶️'}</button>

                <button className={"reset-task-btn"} onClick={handleResetTask}>Reset Task🔄</button>

                <button className={"remove-task-btn"} onClick={onRemove}>Remove Task⛔</button>
            </div>

            <h3>
                {
                timeInSeconds === 0 && timeInMinutes === 0 ? '' :
                    `${timeInMinutes.toString().padStart(2, '0')} 
                        : 
                    ${timeInSeconds.toString().padStart(2, '0')}`
                }
            </h3>
        </div>
    )
}