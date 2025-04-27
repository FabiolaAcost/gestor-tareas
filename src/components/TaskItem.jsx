import React, { Fragment } from "react";

const TaskItem = ({ task, onDelete }) => {
  return (
    <Fragment>
      <li>
        <strong>{task.name}</strong><br />
        Fecha límite: {task.dueDate}<br />
        <span style={{ fontWeight: "bold", color: task.priority === "Alta" ? "red" : "orange" }}>
          Prioridad: {task.priority}
        </span><br />
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </li>
    </Fragment>
  );
};

export default TaskItem;
