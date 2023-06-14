import React, {useState} from "react";
import BlockDashboard from "@/Components/BlockDashboard.jsx";
import BlockDashboardGlobal from "@/Components/BlockDashboardGlobal.jsx";
import BlockDashboardMeteo from "@/Components/BlockDashboardMeteo.jsx";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../../css/FullCalendarStyle.css'
import TaskItemDashboard from "@/Pages/Task/TaskItemDashboard.jsx";
import NavLink from "@/Components/NavLink.jsx";
export default function DashboardLayout({tasks, apiKey}) {

  const [dataArr, setDataArr] = useState( tasks );


  return (
    <>
      <div className="px-6 pt-6 2xl:container">


        <div>
          {dataArr.length === 0 ? (
              <div className="h-full space-y-6 group p-4 sm:p-8 rounded-3xl bg-white border border-gray-200/50 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10 ">
                  Vous n'avez aucune tâche à afficher.
              </div>
          ) : (

            <div className="h-full space-y-6 group p-4 sm:p-8 rounded-3xl bg-white border border-gray-200/50 bg-opacity-50 shadow-2xl shadow-gray-600/10 ">
              <p className="text-center underline text-2xl">Mes 3 dernières tâches</p>
              <div className="lg:flex -mx-2">
                {dataArr.map((task) => (
                    <TaskItemDashboard
                        task={task}
                        key={task.id}
                    />
                ))}
                </div>
              <NavLink href="/task" active={route().current("task.index")} className={'' +
                'flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 hover:text-white active:text-white'}>
                Voir plus de tâches
              </NavLink>
            </div>
          )}

        </div>


        <div className="grid gap-y-6 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 mt-4 justify-center">


          <div className={'h-[520px] col-span-2 lg:order-0'}>
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              locale={'fr'}
              events={dataArr.map((task) => ({ title: task.title, date: task.due_date ? task.due_date.split(" ")[0] : null }))}

            />
          </div>

          <div className={'lg:order:1 '}>
            <BlockDashboardGlobal/>
          </div>

          <div className={'col-span-2 md:order-10 lg:order-3'}>
            <BlockDashboardMeteo apiKey={apiKey}/>
          </div>

          <div className={'lg:order-4'}>
            <BlockDashboard/>
          </div>
        </div>
      </div>
    </>
  )
}
