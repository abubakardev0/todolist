import { useState } from "react";

import useSWR from "swr";
import axios from "axios";

import Task from "@/components/Task";
import ChevronIcon from "@/assets/icons/ChevronIcon";
import ListIcon from "@/assets/icons/ListIcon";

const List = () => {
  const [isOpen, setOpen] = useState(true);
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR("all-todos", async () => {
    const todos = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/todos/`
    );
    return todos.data;
  });

  if (isLoading) {
    return <p className="place-self-center text-white">Loading...</p>;
  }

  if (error) {
    alert(error);
  }

  return (
    <>
      <button
        data-testid="todolist-btn"
        onClick={() => setOpen(!isOpen)}
        className="w-72 md:w-80 xl:w-96 py-1 bg-primary/50 rounded-lg shadow-black/20 shadow-md backdrop-filter backdrop-blur-sm bg-opacity-40 border border-[#acacac]"
      >
        <div className="py-2 px-3 flex gap-2">
          <ListIcon />
          <p className="text-left flex-grow text-white">Your todos</p>
          <span className="self-center">
            <ChevronIcon
              className={`h-4 w-4 transition-transform duration-500 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="relative -mt-4 w-72 md:w-80 xl:w-96 divide-y divide-alternative bg-opacity-80 backdrop-blur-sm backdrop-filter scroll-p-2 list-scrollbar min-h-fit max-h-72 overflow-auto py-2.5 bg-secondary rounded-lg drop-shadow-sm">
          {todos?.length > 0 ? (
            todos?.map((t) => (
              <Task
                key={t.entityId}
                id={t.entityId}
                isCompleted={t.completed}
                completedAt={t.completed_at}
                task={t.task}
                createdAt={t.created_at}
              />
            ))
          ) : (
            <p className="text-center py-16">No task today</p>
          )}
        </div>
      )}
    </>
  );
};

export default List;
