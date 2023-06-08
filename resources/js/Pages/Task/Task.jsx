import React, { useState } from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import TaskList from './TaskList.jsx';
import Select from "@/Components/Select.jsx";

export default function Task({ user, tasks, selectedCategory  }) {
  const [filterBy, setFilterBy] = useState(selectedCategory || '');

  const handleChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterBy(selectedFilter);
    router.visit(`/task?category=${selectedFilter}`, { preserveScroll: true });
  };

  const filteredTasks = tasks.filter((task) => {
    return filterBy === "" || task.category === filterBy;
  });

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
            <div className="p-6 text-gray-900">
              <Select
                id="filterBy"
                name="filterBy"
                value={filterBy}
                onChange={handleChange}
              >
                <option value="">Trier par</option>
                <option value="Sans catégorie">🏷️ Sans catégorie</option>
                <option value="Voyages">✈ Voyages</option>
                <option value="Sport">🏈 Sport</option>
                <option value="Finance">💸 Finance</option>
                <option value="Professionnel">💼 Professionnel</option>
                <option value="Autre">⚙️ Autre</option>
              </Select>
              <TaskList tasks={filteredTasks} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
