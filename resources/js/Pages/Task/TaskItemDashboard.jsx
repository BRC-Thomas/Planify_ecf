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
/*      hour: '2-digit',
      minute: '2-digit',*/
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

  return (

    <div className="lg:w-1/3 px-2 mb-4 md:mb-2 relative">
      <div>
        <div
          className=" p-2 rounded-lg shadow hover:bg-gray-100 ">
          <Link
            href={`/task/${task.id}/edit`}
            method="get"
            as="button"
            type="button"
            className="mb-2 text-md sm:text-xl font-semibold tracking-tight text-gray-900 truncate max-w-full lg:max-w-[150px] "
          >{task.title}

          </Link>
          <p className="mb-3 font-normal text-gray-500 break-words max-w-[80%] h-10 truncate">{task.description}</p>
        </div>

        <p className="text-sm leading-6 text-gray-900 absolute top-0 right-5">{task.category}</p>
        {task.isDone ? (
            <p className="pb-1 text-xs leading-5 text-gray-500 mb-2 absolute top-5 right-5">
              Fini le{' '}<time dateTime={task.updated_at}>{formattedDate(task.updated_at)}</time>
            </p> ) :
          task.updated_at === task.created_at ? (
            <p className="pb-1 text-xs leading-5 text-gray-500 mb-2 absolute top-5 right-5">
              Crée le{' '}
              <time dateTime={task.created_at}>
                {formattedDate(task.created_at)}
              </time>
            </p>
          ) : (
            <p className="pb-1 text-xs leading-5 text-gray-500 mb-2 absolute top-5 right-5">
              Modifié le{' '}
              <time dateTime={task.updated_at}>
                {formattedDate(task.updated_at)}
              </time>
            </p>
          )
        }
      </div>







    </div>
  );
}
