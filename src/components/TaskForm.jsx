import React, { useState } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({ name: "", dueDate: "" });
  const [validator] = useState(
    new SimpleReactValidator({
      messages: {
        required: "Este campo es obligatorio.",
        futuredate: "La fecha ingresada no es válida."
      },
      validators: {
        futuredate: {
          message: "La fecha ingresada no es válida.",
          rule: (val) => {
            if (!val) return false;
            const selectedDate = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            return selectedDate >= today;
          },
          required: true
        }
      }
    })
  );
  
    const [forceUpdate, setForceUpdate] = useState(0); 

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        const suggestedPriority = response.data.id % 2 === 0 ? "Alta" : "Media";

        const newTask = {
          ...task,
          priority: suggestedPriority,
          createdAt: new Date().toISOString(),
        };

        onTaskAdded(newTask);
        setTask({ name: "", dueDate: "" });
        validator.hideMessages();
        setForceUpdate(forceUpdate + 1);
      } catch (error) {
        console.error("Error en la API simulada:", error);
      }
    } else {
      validator.showMessages();
      setForceUpdate(forceUpdate + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la tarea:</label><br />
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
        <br />
        {validator.message("name", task.name, "required")}
      </div>

      <div>
        <label>Fecha límite:</label><br />
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <br />
        {validator.message("dueDate", task.dueDate, "required|futuredate")}
        </div>

      <button type="submit">Guardar tarea</button>
    </form>
  );
};

export default TaskForm;