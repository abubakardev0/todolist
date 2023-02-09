import { getTasks } from "@/utils/redis";

export default async function handler(req, res) {
  try {
    const tasks = await getTasks();
    res.status(200).json({ tasks });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
