import "./Task.css";

interface TaskProps {
  summary: string;
}

const Task: React.FC<TaskProps> = ({ summary }) => {
  return (
    <div className='task'>
      <p>{summary}</p>
    </div>
  );
};

export default Task;
