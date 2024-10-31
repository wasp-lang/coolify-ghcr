import { type Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type GetTasks } from "wasp/server/operations";

//Using TypeScript's new 'satisfies' keyword, it will infer the types of the arguments and return value
export const getTasks = (async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const tasks = await context.entities.Task.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: "asc" },
  });
  return tasks.map((task) => {
    task.description = task.description.toUpperCase();
    return task;
  });
}) satisfies GetTasks<void, Task[]>;
