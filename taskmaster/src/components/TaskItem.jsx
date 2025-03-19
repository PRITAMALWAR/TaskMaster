const TaskItem = ({ task, taskId, fetchTasks }) => {
    const handleDelete = async () => {
      await fetch(`https://taskmaster-444af-default-rtdb.firebaseio.com/tasks/${taskId}.json`, {
        method: 'DELETE'
      });
      fetchTasks();
    };
  
    return (
      <div className="bg-gray-100 p-3 rounded mb-2 shadow">
        <h4 className="font-bold">{task.title}</h4>
        <p>{task.description}</p>
        <p className="text-sm">Due: {task.dueDate}</p>
        <p className="text-sm">Priority: {task.priority}</p>
        <p className="text-sm">Status: {task.status}</p>
        <button onClick={handleDelete} className="text-red-500 mt-2">Delete</button>
      </div>
    );
  };
  
  export default TaskItem;
  