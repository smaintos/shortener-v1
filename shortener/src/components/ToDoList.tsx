import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    const newTaskObj: Task = {
      id: Date.now(), // Utiliser l'horodatage pour l'ID de la tâche
      text: newTask,
      isCompleted: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        To-Do List
      </h2>
      <div className="mb-3 flex">
        <input
          type="text"
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm mr-2"
          placeholder="Ajouter une nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
        >
          Ajouter
        </button>
      </div>
      <ul className="list-none mt-4 space-y-2 overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border border-slate-600 rounded ${
              task.isCompleted ? 'bg-slate-600 line-through' : 'bg-slate-700'
            }`}
          >
            <span className={`text-slate-100 ${task.isCompleted ? 'opacity-60' : ''}`}>
              {task.text}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleComplete(task.id)}
                className="p-1 text-green-500 hover:text-green-600"
                aria-label="Marquer comme terminé"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-1 text-red-500 hover:text-red-600"
                aria-label="Supprimer la tâche"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
