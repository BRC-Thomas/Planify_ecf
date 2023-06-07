import TaskItem from './TaskItem.jsx';
import {useState} from "react";

export default function TaskList({ tasks }) {

  //const [dataArr, setDataArr] = useState([{tasks}])

   return (
    <ul role="list" className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task}/>
      ))}
    </ul>
  );
}
