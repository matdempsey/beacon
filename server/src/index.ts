import "dotenv/config";
import express, { json } from "express";
import boardRoutes from "./routes/board-routes";
import listRoutes from "./routes/list-routes";
import taskRoutes from "./routes/task-routes";

const app = express();
const PORT = 8081;

app.use(json());
app.use("/api/v1/boards", boardRoutes);
app.use("/api/v1/lists", listRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Express server is listening on port: ${PORT}`);
  } else {
    console.error(`Failed to start Express server ${error}`);
  }
});
