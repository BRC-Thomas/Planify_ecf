import React from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Task({ user }) {
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
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 hover:bg-slate-200">Tache n°1</div>
            <div className="p-6 text-gray-900 hover:bg-slate-200">Tache n°2</div>
            <div className="p-6 text-gray-900 hover:bg-slate-200">Tache n°3</div>
            <div className="p-6 text-gray-900 hover:bg-slate-200">Tache n°4</div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
