import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";

import GetTasks from "@/pages/api/tasks";

test("Get all tasks in todo list", async () => {
  const { req, res } = createMocks({
    method: "GET",
  });

  await GetTasks(req, res);
  expect(res._getStatusCode()).toBe(200);
});
