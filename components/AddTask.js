import { useState } from "react";

import { useSWRConfig } from "swr";
import axios from "axios";

import PlusIcon from "@/assets/icons/PlusIcon";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    if (!formData.task) {
      alert("Please add todo task");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/todos/`, {
        task: formData.task,
        completed: false,
        created_at: new Date(),
        completed_at: null,
      });
      mutate("all-todos");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
      event.target.reset();
    }
  };

  return (
    <form
      data-testid="add-task-input"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="flex justify-between py-2 w-72 md:w-80 xl:w-96 bg-white rounded-md pl-3 pr-2 focus:outline-none text-neutral-800">
        <input
          type="text"
          inputMode="text"
          pattern="^\s*\S.*$"
          autoComplete="off"
          name="task"
          placeholder="Add new task"
          className="w-full focus:outline-none"
          required
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Input doesn't just contain whitespaces!"
            )
          }
          onInput={(e) => e.target.setCustomValidity("")}
        />
        <button
          disabled={loading ? true : false}
          type="submit"
          className="disabled:cursor-not-allowed w-fit rounded-md bg-[#bbb18c] p-1"
        >
          <PlusIcon />
        </button>
      </div>
    </form>
  );
};

export default AddTask;
