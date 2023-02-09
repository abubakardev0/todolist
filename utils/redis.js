import { Client, Entity, Schema } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Task extends Entity {}
let schema = new Schema(
  Task,
  {
    task: { type: "string" },
    completed: { type: "boolean" },
    completed_at: { type: "date" },
    created_at: { type: "date" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function addTask(data) {
  await connect();
  const repository = client.fetchRepository(schema);
  const task = repository.createEntity(data);
  const id = await repository.save(task);
  return id;
}

export async function getTasks() {
  await connect();
  const taskRepository = client.fetchRepository(schema);
  const tasks = await taskRepository
    .search()
    .sortBy("completed", "ASC")
    .returnAll();
  return tasks;
}

export async function changeStatus(entityId, status) {
  await connect();
  const taskRepository = client.fetchRepository(schema);
  const todo = await taskRepository.fetch(entityId);
  todo.completed = status;
  if (status === true) {
    todo.completed_at = Date.now();
  } else {
    todo.completed_at = null;
  }
  await taskRepository.save(todo);
}

export async function deleteTask(entityId) {
  await connect();
  const taskRepository = client.fetchRepository(schema);
  const tasks = await taskRepository.remove(entityId);
  return tasks;
}
