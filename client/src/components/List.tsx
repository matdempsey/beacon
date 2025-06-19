import { Droppable } from "@hello-pangea/dnd";
import type { TaskType } from "../types/task";
import Tasks from "./Tasks";

import "./List.css";

interface ListProps {
  name: string;
  tasks: TaskType[];
}

const List: React.FC<ListProps> = ({ name, tasks }) => {
  const tasksCount = tasks.length;

  return (
    <div className='list'>
      <div className='list-header'>
        <span className='list-header__text'>{name}</span>
        <span className='list-header__text'>{tasksCount}</span>
      </div>

      <Droppable droppableId={name} type='tasks'>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDraggingOver ? "list--drag-over" : ""}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Tasks tasks={tasks} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
