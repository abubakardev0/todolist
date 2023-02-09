import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";

import ChangeStatus from "@/pages/api/changestatus";

test("change status of task", async () => {
  const { req, res } = createMocks({
    method: "POST",
    query: {
      entityId: 285555555,
      status: "Completed",
    },
  });

  await ChangeStatus(req, res);
  expect(res._getStatusCode()).toBe(500);
});
