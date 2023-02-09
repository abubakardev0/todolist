import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";

import AddTask from "@/pages/api/addtask";

test("Add todo task in database", async () => {
  const { req, res } = createMocks({
    method: "POST",
    query: {
      task: "Asim Kamla",
      completed: false,
      created_at: Date.now(),
      completed_at: null,
    },
  });

  await AddTask(req, res);
  expect(res._getStatusCode()).toBe(200);
});
