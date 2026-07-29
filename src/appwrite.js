import {Client, TablesDB, ID} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
 .setEndpoint('https://sgp.cloud.appwrite.io/v1')
 .setProject(PROJECT_ID)

const tablesDB = new TablesDB(client);

export const getAllTasks = async () => {
   try {
      const response = await tablesDB.listRows({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID
      });
      return response.rows;
   } catch (error) {
      console.log('Failed fetching tasks', error);
   }
}

export const createTask = async (urlVideo) => {
   try {
      const response = await tablesDB.createRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: ID.unique(),
         data: {
            taskName: prompt('Enter Task Name (Max 255 characters long):'),
            taskDuration: parseInt(prompt('Enter Task Duration In Minutes (Optional):')),
            urlVideo: urlVideo,
         }
      });
      console.log('Success create task', response);
      return response;
   } catch (error) {
      console.log('Failed Create Task', error);
   }
}

export const updateTaskStatus = async (taskId, isCompleted, isRunning) => {
   try {
      const response = await tablesDB.updateRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: taskId,
         data: {
            isCompleted: !isCompleted,
            isRunning: isRunning ? !isRunning : isRunning,
         }
      });
   } catch (error) {
      console.log(error);
   }
}

export const startTask = async (taskId, startTime) => {
   try {
      const response = await tablesDB.updateRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: taskId,
         data: {
            isRunning: true,
            startTime: startTime,
         }
      })
   } catch (error) {
      console.log('Failed while startTask with error:', taskId);
   }
}

export const updateRunningStatus = async (taskId, isRunning) => {
   try {
      const response = await tablesDB.updateRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: taskId,
         data: {
            isRunning: !isRunning,
         }
      });
   } catch (error) {
      console.log(error);
   }
}

export const resetTask = async (taskId) => {
   try {
      const response = await tablesDB.updateRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: taskId,
         data: {
            isRunning: false,
         }
      });
   } catch (error) {
      console.log('Failed reset task', error);
   }
}

export const removeTask = async (taskId, taskName) => {
   try {
      const confirmed = confirm(`Are you sure you want to remove '${taskName}' task?`);

      if (!confirmed) return;
      
      const response = await tablesDB.deleteRow({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         rowId: taskId
      });
   } catch (error) {
      console.log(error);
   } 
}