import './TaskItem.css';
export default function TaskList({ task, delFunc  }) {
  const formattedDate = dateStr => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }


  const handleDelete = (e) => {
    e.preventDefault();
    delFunc(task.id);
  };

  return (
    <li className="flex justify-between gap-x-6 py-5 hover-underline-animation relative">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm truncate font-semibold leading-6 text-gray-900 max-w-md">
            {task.title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 max-w-md">
            {task.description}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{task.category}</p>
        {task.updated_at === task.created_at ? (
          <p className="mt-1 text-xs leading-5 text-gray-500 mb-2">
            Crée le{" "}
            <time dateTime={task.created_at}>
              {formattedDate(task.created_at)}
            </time>
          </p>
        ) : (
          <p className="mt-1 text-xs leading-5 text-gray-500 mb-2">
            Modifié le{" "}
            <time dateTime={task.updated_at}>
              {formattedDate(task.updated_at)}
            </time>
          </p>
        )}
        <form
          onSubmit={handleDelete}
        >
          <button
            type="submit"
            className="inline-flex items-center px-2 py-1 mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md absolute bottom-1 right-0"
            onClick={handleDelete}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>

          </button>
        </form>
      </div>
    </li>
  );
}
