import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return <p>No hay tareas pendientes</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
