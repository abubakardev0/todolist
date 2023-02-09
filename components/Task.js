import { useState } from "react";

import CheckCircleIcon from "@/assets/icons/CheckCircleIcon";
import DotIcon from "@/assets/icons/DotIcon";

const Task = ({ id, task, isCompleted, completedAt, createdAt }) => {
  const [isOpen, setOpen] = useState(false);

  const changeStatus = async (id, status) => {
    try {
      await fetch("/api/changestatus", {
        method: "POST",
        body: JSON.stringify({
          entityId: id,
          status: status,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (e) {
      alert(e);
    }
  };

  const deleteTask = async (entityId) => {
    try {
      await fetch("/api/deletetask", {
        body: JSON.stringify(entityId),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className="relative py-2 pl-2 pr-1 flex gap-2">
        <span className="px-1">
          <button onClick={() => changeStatus(id, !isCompleted)}>
            <CheckCircleIcon
              className={`w-6 h-6 ${
                isCompleted ? "fill-primary" : "fill-none stroke-primary"
              }`}
            />
          </button>
        </span>
        <p className="flex-grow">{task}</p>
        <span>
          <button onClick={() => setOpen(!isOpen)}>
            <DotIcon />
          </button>
        </span>
      </div>
      {isOpen && (
        <div key={id} className="w-full p-3 bg-secondary">
          <p>
            <span className="mr-1 font-medium">Completed:</span>{" "}
            {isCompleted ? "Completed" : "Not Completed"}
          </p>
          <p>
            <span className="mr-1 font-medium">Created At:</span>
            {new Date(createdAt).toLocaleDateString("en-US", {
              hour12: true,
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          {isCompleted && (
            <p>
              <span className="mr-1 font-medium">Completed At:</span>
              {new Date(completedAt).toLocaleDateString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          )}
          <button
            onClick={() => deleteTask(id)}
            className="mt-2 rounded-md w-full bg-red-200 hover:bg-red-300 py-1.5 text-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default Task;
