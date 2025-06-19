import { useState } from "react";
import List from "./List";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { ListType } from "../types/list";

import "./Lists.css";

// temp
const mockTasks = [
  { summary: "task 1" },
  { summary: "task 2" },
  { summary: "task 3" },
  { summary: "task 4" },
  { summary: "task 5" },
];

// temp
const initialMockListsState = [
  { name: "To Do", tasks: mockTasks },
  { name: "In Progress", tasks: [] },
  { name: "In Review", tasks: [] },
  { name: "Done", tasks: [] },
];

const moveTask = (
  lists: ListType[],
  source: { index: number; droppableId: string },
  destination: { index: number; droppableId: string }
) => {
  const sourceListIdx = lists.findIndex(
    (list) => list.name === source.droppableId
  );
  const destinationListIdx = lists.findIndex(
    (list) => list.name === destination.droppableId
  );

  // shallow copies
  const sourceTasks = [...lists[sourceListIdx].tasks];
  const destinationTasks = [...lists[destinationListIdx].tasks];

  const [taskToMove] = sourceTasks.splice(source.index, 1);

  // check if we are moving the task within the same list or to a new list.
  if (sourceListIdx === destinationListIdx) {
    sourceTasks.splice(destination.index, 0, taskToMove);
  } else {
    destinationTasks.splice(destination.index, 0, taskToMove);
  }

  return lists.map((list, idx) => {
    if (idx === sourceListIdx) {
      return {
        ...list,
        tasks: sourceTasks,
      };
    }
    if (idx === destinationListIdx) {
      return {
        ...list,
        tasks: destinationTasks,
      };
    }
    return list;
  });
};

const Lists = () => {
  const [lists, setLists] = useState<ListType[]>(initialMockListsState);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // check task was dropped outside a list.
    if (!destination) {
      return;
    }

    const updatedLists = moveTask(lists, source, destination);
    setLists(updatedLists);
  };

  return (
    <div className='lists'>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map(({ name, tasks }) => (
          <List key={name} name={name} tasks={tasks} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Lists;
