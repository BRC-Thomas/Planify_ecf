import React from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Task({ user, tasks }) {
  return (
       <AuthenticatedLayout
      user={user.name}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Mes tâches
        </h2>
      }
    >
      <Head title="Mes tâches" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {console.log(tasks)}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            
            
            <div className="p-6 text-gray-900 hover:bg-slate-200">
            {/* {tasks.map((task) => (
                <div key={task.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">{task.title}</div>
                </div>
            ))} */}
            </div>
          </div>
          
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
