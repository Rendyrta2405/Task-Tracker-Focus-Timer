import {Client, Databases, ID} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
 .setEndpoint('https://sgp.cloud.appwrite.io/v1')
 .setProject(PROJECT_ID)

const databases = new Databases(client);

export const getAllTasks = async () => {
   try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      return response.documents;
   } catch (error) {
      alert(error);
      // alert('Failed fetching tasks');
   }
}

export const createTask = async () => {
   try {
      const response = await databases.createDocument(
         DATABASE_ID,
         COLLECTION_ID,
         ID.unique(),
         {
            taskName: prompt('Enter Task Name: ',),
            taskDuration: parseInt(prompt('Enter Task Duration (Optional): ')) || 5,
            isCompleted: false
         }
      );
      alert('Success create task', response);
   } catch (error) {
      alert('Failed Create Task', error);
   }
}

export const updateTaskStatus = async (taskId, isCompleted, isRunning) => {
   try {
      const response = await databases.updateDocument(
         DATABASE_ID,
         COLLECTION_ID,
         taskId,
         {
            isCompleted: !isCompleted,
            isRunning: isRunning ? false : true,
         }
      );
   } catch (error) {
      alert(error);
   }
}

export const updateRunningStatus = async (taskId, isRunning) => {
   try {
      const response = await databases.updateDocument(
         DATABASE_ID,
         COLLECTION_ID,
         taskId,
         {
            isRunning: !isRunning
         }
      )
   } catch (error) {
      alert(error);
   }
}

export const removeTask = async (taskId, taskName) => {
   try {
      const confirmed = confirm(`Are you sure you want to remove '${taskName}' task?`);

      if (!confirmed) return;
      
      const response = await databases.deleteDocument(
         DATABASE_ID,
         COLLECTION_ID,
         taskId
      );
   } catch (error) {
      alert(error);
   } 
}