import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { db } from "./firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = async (newTask) => {
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTasks([...tasks, { ...newTask, id: docRef.id }]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id)); 
      setTasks(tasks.filter((task) => task.id !== id)); 
    } catch (error) {
      console.error("Error eliminando la tarea desde Firestore:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksFromDB = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksFromDB);
    };
  
    fetchTasks();
  }, []);  

  const [showForm, setShowForm] = useState(false);

  return (
    <div >
      <h1>Gestor de Tareas</h1>
  
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar formulario" : "Agregar tarea"}
      </button>
  
      {showForm && <TaskForm onTaskAdded={handleTaskAdded} />}
  
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDelete} />
      )}
    </div> 
  );
}
export default App;