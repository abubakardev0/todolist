import PlusIcon from "@/assets/icons/PlusIcon";

const AddTask = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    if (formData.task.length === 0) {
      alert("Please add task");
      return;
    }
    try {
      await fetch("/api/addtask", {
        body: JSON.stringify({
          task: formData.task,
          completed: false,
          created_at: Date.now(),
          completed_at: null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (e) {
      alert(e);
    }
    event.target.reset();
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
          autoComplete="off"
          name="task"
          placeholder="Add new task"
          className="w-full focus:outline-none"
        />
        <button type="submit" className="w-fit rounded-md bg-[#bbb18c] p-1">
          <PlusIcon />
        </button>
      </div>
    </form>
  );
};

export default AddTask;
