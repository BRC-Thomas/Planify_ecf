import React, {useState} from "react";
import BlockDashboard from "@/Components/BlockDashboard.jsx";
import BlockDashboardGlobal from "@/Components/BlockDashboardGlobal.jsx";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import frLocale from '@fullcalendar/core/locales/fr';
import '../../css/FullCalendarStyle.css'
import TaskItem from "@/Pages/Task/TaskItem.jsx";
export default function DashboardLayout({tasks}) {

  const [dataArr, setDataArr] = useState( tasks );


  /*if (!Array.isArray(tasks)) {
    // Afficher un message ou un contenu alternatif si les tâches ne sont pas un tableau valide
    return <div>Les tâches ne sont pas disponibles.</div>;
  }*/
  return (
    <>
      <div className="px-6 pt-6 2xl:container">


        <div>
          {dataArr.length === 0 ? (
              <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
                Vous n'avez aucune tâche à afficher.
              </div>
          ) : (

              <ul role="list" className="divide-y divide-gray-100">
                {dataArr.map((task) => (
                    <TaskItem
                        task={task}
                        key={task.id}
                    />
                ))}
              </ul>
          )}
        </div>


        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 justify-center">
          <div className={'h-[520px] sm:col-span-2 '}>

            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              locale={'fr'}
              events={[
                { title: 'event 1', date: '2023-06-06' },
              ]}
            />
          </div>

          {/*<div>
            <BlockDashboardLine/>
          </div>*/}

          <div>
            <BlockDashboardGlobal/>
          </div>
          <div>
            <BlockDashboard/>
          </div>
        </div>
      </div>
    </>
  )
}
