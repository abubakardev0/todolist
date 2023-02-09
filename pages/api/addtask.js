import { addTask } from "@/utils/redis";

export default async function handler(req, res) {
  try {
    await addTask(req.body);
    res.status(200).json({ message: "Task added successfully." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
