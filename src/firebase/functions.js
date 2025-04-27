import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./config"; 

const functions = getFunctions(app); 

export const deleteTaskById = async (taskId) => {
  const deleteTask = httpsCallable(functions, "deleteTask");
  return await deleteTask({ taskId: String(taskId) });
};
