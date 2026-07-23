import {useState} from "react";
import {ListItem} from './ListItem';

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

   const handleAddTask = () => {
      const newTask = {
         id: Date.now(),
         title: prompt('Enter Task Name:'),
      };

      setTodoList([
         ...todoList,
         newTask
      ]);
   };

   const handleRemoveTask = (id) => {
      const removedItem = todoList.find(item => item.id === id);
      const confirmed = confirm(`Are you sure you want to remove '${removedItem.text}' task?`);

      if (!confirmed) return;

      setTodoList(
         todoList.filter(item => item.id !== id)
      );
   };
   
   return (
      <div>
         {
            todoList.map((item) => (
               <ListItem key={item.id} title={item.title} onRemove={() => handleRemoveTask(item.id)} />
            ))
         }

         <button onClick={handleAddTask}>Add New Task</button>
      </div>
   )
}