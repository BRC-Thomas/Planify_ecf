import TaskItem from './TaskItem.jsx';
import {useState, useEffect} from "react";
import { router } from '@inertiajs/react'


export default function TaskList({ tasks, selectedCategory }) {

  const [dataArr, setDataArr] = useState(tasks);
  const [flash,setFlash] = useState(null);

  // Delete Task
  const deleteElement = async (id) => {
    try {
      console.log("deleteElement fonction (taskList)");
      await router.delete(`/task/${id}`);
      setDataArr(dataArr.filter(task => task.id !== id));
      setFlash('Tâche supprimée avec succès');

      await new Promise(resolve => setTimeout(resolve, 300));
      router.reload({ preserveScroll: true });
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  const alert_del = document.querySelectorAll('.alert-del');
  alert_del.forEach((x) =>
    x.addEventListener('click', function () {
      x.parentElement.classList.add('hidden');
    })
  );

  useEffect( () => {
    if(flash) {
      setTimeout(() => {
        setFlash(null)
      },2000)
    }
  }, [flash]);

  useEffect(() => {
    if (tasks !== dataArr) {
      setDataArr(tasks);
    }
  }, [tasks]);




  return (
    <>
      {selectedCategory && <p>Filtre : {selectedCategory}</p>}
      {flash && (
        <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 shadow-md max-w-fit absolute mt-[-60px] right-5 z-10  " role="alert">
          <div className="flex px-4 py-3">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{flash}</p>
              <p className="text-sm">Une tâche de moins à vous soucier !🎉</p>
            </div>
            <strong className="text-xl align-center cursor-pointer alert-del  ml-4">&times;</strong>
          </div>
        </div>
    )}

      {dataArr.length === 0 ? (
        <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
            Vous n'avez aucune tâche dans cette catégorie.
        </div>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {dataArr.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              created_at={task.created_at}
              updated_at={task.updated_at}
              category={task.category}
              task={task}
              delFunc={deleteElement}
            />
          ))}
        </ul>
      )}
    </>
  );
}
