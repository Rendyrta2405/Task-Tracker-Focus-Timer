import {useState} from "react";
import {ListItem} from "./ListItem";
import React from "react";
import {createTask} from "../appwrite.js";

export const TodoList = () => {
   const [todoList, setTodoList] = useState([
        {
            id: 1,
            title: "Learn React",
        },
        {
            id: 2,
            title: "Build React App",
        },
      ]);

   const videos = [
      'https://cdn.pixabay.com/video/2019/08/14/26038-355469027_tiny.mp4',
      'https://cdn.pixabay.com/video/2023/04/15/159052-818026310_tiny.mp4',
      'https://cdn.pixabay.com/video/2019/10/01/27439-363642443_tiny.mp4',
      'https://cdn.pixabay.com/video/2023/05/03/161515-823603558_tiny.mp4',
      'https://cdn.pixabay.com/video/2019/08/14/26041-355469036_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/05/04/115992-706323980_tiny.mp4',
      'https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4',
      'https://cdn.pixabay.com/video/2020/12/15/59291-492700392_tiny.mp4',
      'https://cdn.pixabay.com/video/2026/06/16/358693_tiny.mp4',
      'https://cdn.pixabay.com/video/2019/02/28/21723-320725678_tiny.mp4',
      'https://cdn.pixabay.com/video/2018/09/25/18420-292228405_tiny.mp4',
      'https://cdn.pixabay.com/video/2024/12/03/244754_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/10/19/135658-764361528_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/03/15/110877-689510466_tiny.mp4',
      'https://cdn.pixabay.com/video/2019/02/01/21113-315137061_tiny.mp4',
      'https://cdn.pixabay.com/video/2019/09/12/26818-361092071_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/11/22/140111-774507949_tiny.mp4',
      'https://cdn.pixabay.com/video/2018/05/12/16166-269541539_tiny.mp4',
      'https://cdn.pixabay.com/video/2021/02/20/65774-515379441_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/08/08/127073-737747499_tiny.mp4',
      'https://cdn.pixabay.com/video/2023/05/06/161944-824623563_tiny.mp4',
      'https://cdn.pixabay.com/video/2020/12/27/60429-495582465_tiny.mp4',
      'https://cdn.pixabay.com/video/2021/10/19/92561-636709928_tiny.mp4',
      'https://cdn.pixabay.com/video/2021/10/19/92562-636709942_tiny.mp4',
      'https://cdn.pixabay.com/video/2022/02/10/107303-676158761_tiny.mp4',
      'https://cdn.pixabay.com/video/2020/12/26/60380-495376848_tiny.mp4'
   ];

    const handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            title: prompt('Enter Task Name:'),
        };

       if (!newTask.title) {
          return;
       } else if (newTask.title.length < 3) {
          return alert(`The task name must be more than 3 characters long!`)
       }

        setTodoList([
            ...todoList,
            newTask
        ]);
    };

    const handleRemoveTask = (id) => {
        const removedItem = todoList.find(item => item.id === id);
        const confirmed = confirm(`Are you sure you want to remove '${removedItem.title}' task?`);

        if (!confirmed) return;

        setTodoList(
            todoList.filter(item => item.id !== id)
        );
    };

    return (
        <div className={"container"}>
           <div className="flex justify-between w-full mb-2">
              <h3 className="text-4xl font-bold honk-system-ui">My Tasks</h3>
              <button className={"add-task-btn"} onClick={createTask}>Add New Task 📝</button>
           </div>
            {
              todoList.length === 0 ? (
                 <div className={"empty-task"}>
                    <h3>You don't have any task yet ☹️</h3>
                    <p>Go ahead and create a new task—and get it done 🔥</p>
                 </div>)
              : ''
            }
           
            {
                todoList.map((item, index) => (
                   <div 
                      className="task-container" 
                      >
                      <div className="task-number">
                         <span className="tourney-sans-serif">{index + 1}</span>
                      </div>
                     <ListItem key={item.id} title={item.title} onRemove={() => handleRemoveTask(item.id)} videos={videos} />
                   </div>
                ))
            }
        </div>
    )
}