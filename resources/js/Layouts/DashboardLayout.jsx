import BlockDashboard from "@/Components/BlockDashboard.jsx";
import BlockDashboardLine from "@/Components/BlockDashboardLine.jsx";
import BlockDashboardGlobal from "@/Components/BlockDashboardGlobal.jsx";
import BlockDashboardTop from "@/Components/BlockDashboardTop.jsx";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import frLocale from '@fullcalendar/core/locales/fr';
import '../../css/FullCalendarStyle.css'
export default function DashboardLayout() {


  return (
    <>
      <div className="px-6 pt-6 2xl:container">


        <div>
          <BlockDashboardTop/>
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
