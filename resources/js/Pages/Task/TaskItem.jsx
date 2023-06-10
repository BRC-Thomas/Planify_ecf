import './TaskItem.css';
import {Link, usePage} from "@inertiajs/react";
import {useState} from "react";


export default function TaskItem({task, delFunc, checkFunc,  }) {

  const { page } = usePage();
  const [isDone,setIsDone] = useState(task.isDone);

  const formattedDate = dateStr => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }


  const handleDelete = e => {
    e.preventDefault();
    delFunc(task.id);
  };

  const handleCheck = e => {
    e.preventDefault();
    setIsDone(!task.isDone);
    checkFunc(task.id);
  }

  console.log(task)

  return (
    <li className="flex justify-between gap-x-6 py-5 hover-underline-animation relative">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm truncate font-semibold leading-6 text-gray-900 max-w-[100px] sm:max-w-[300px] md:max-w-[450px]">
            {task.title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 max-w-[100px] sm:max-w-[300px] md:max-w-[450px]">
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm leading-6 text-gray-900">{task.category}</p>
        {task.isDone ? (
            <p className="pb-1 text-xs leading-5 text-gray-500 mb-2">
              Fini le{' '}<time dateTime={task.updated_at}>{formattedDate(task.updated_at)}</time>
            </p> ) :
            task.updated_at === task.created_at ? (
                  <p className="pb-1 text-xs leading-5 text-gray-500 mb-2">
                    Crée le{' '}
                    <time dateTime={task.created_at}>
                      {formattedDate(task.created_at)}
                    </time>
                  </p>
              ) : (
                  <p className="pb-1 text-xs leading-5 text-gray-500 mb-2">
                    Modifié le{' '}
                    <time dateTime={task.updated_at}>
                      {formattedDate(task.updated_at)}
                    </time>
                  </p>
              )
          }

        <form
          onSubmit={handleDelete}
        >
          <button
            type="submit"
            className="inline-flex items-center px-2 py-1 mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md absolute bottom-1 right-0"
            onClick={handleDelete}
          >
            ❌
          </button>
        </form>
        <Link
          href={`/task/${task.id}/edit`}
          method="get"
          as="button"
          type="button"
          className="inline-flex items-center px-2 py-1 mt-2 bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium rounded-md absolute bottom-1 right-20"
        >
          🔎️
        </Link>
        <button
          type="button"
          className={task.isDone ? "inline-flex items-center px-2 py-1 mt-2 bg-green-300 hover:bg-green-400 text-white text-sm font-medium rounded-md absolute bottom-1 right-10" :
              "inline-flex items-center px-2 py-1 mt-2 bg-slate-300 hover:bg-slate-400 text-white text-sm font-medium rounded-md absolute bottom-1 right-10"}
          onClick={handleCheck}
      >
          ✔️
      </button>
      </div>
    </li>
  );
}
