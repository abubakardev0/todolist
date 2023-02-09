import { deleteTask } from "@/utils/redis";

export default async function handler(req, res) {
  try {
    await deleteTask(req.body);
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
