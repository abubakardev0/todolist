import { changeStatus } from "@/utils/redis";

export default async function handler(req, res) {
  try {
    const { entityId, status } = req.body;
    await changeStatus(entityId, status);
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
