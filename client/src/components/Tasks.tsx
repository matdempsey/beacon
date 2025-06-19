import { Draggable } from "@hello-pangea/dnd";
import Task from "./Task";
import type { TaskType } from "../types/task";

import "./Tasks.css";

interface TasksProps {
  tasks: TaskType[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => (
  <div className='task-list'>
    {tasks.map(({ summary }, idx) => (
      <Draggable key={summary} draggableId={summary} index={idx}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDragging ? "task--dragging-state" : ""}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task summary={summary} />
          </div>
        )}
      </Draggable>
    ))}
  </div>
);

export default Tasks;
