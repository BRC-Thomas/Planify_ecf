import './TaskItem.css';
export default function TaskList({ task }) {
  const formattedDate = dateStr => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }


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
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Crée le{" "}
            <time dateTime={task.created_at}>
              {formattedDate(task.created_at)}
            </time>
          </p>
        ) : (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Modifié le{" "}
            <time dateTime={task.updated_at}>
              {formattedDate(task.updated_at)}
            </time>
          </p>
        )}
      </div>
    </li>
  );
}
