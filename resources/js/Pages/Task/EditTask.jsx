import React, { useState } from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from "@/Components/InputError.jsx";
import DatePicker from "@/Components/DatePicker.jsx";

export default function EditTask({ user, task }) {
  const { data, setData, put, errors } = useForm({
    title: task.title,
    description: task.description || " ",
    category: task.category,
    isDone: task.isDone,
    due_date: task.due_date || null
  });

  const [selectedDate, setSelectedDate] = useState(task.due_date ? new Date(task.due_date) : null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const url = route('task.update', { task: task.id });

    if (!selectedDate) {
      setData('due_date', null);
    }

    put(url, data);
  };


  const handleUpdateIsDone = (e) => {
    e.preventDefault();
    const url = route('task.updateIsDone', { task: task.id });

    router.put(url);
  };

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    setData('due_date', selectedDate ? selectedDate.getTime() : null);
  };

  return (
    <AuthenticatedLayout
      user={user.name}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Éditer des tâches
        </h2>
      }
    >
      <Head title="Éditer des tâches" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={handleSubmit}>
                <div>
                  <InputLabel htmlFor="text" value="Titre" />
                  <div className="relative">
                    <TextInput
                      id="title"
                      type="text"
                      name="title"
                      className="mt-1 block w-full"
                      autoComplete="off"
                      isFocused={true}
                      value={data.title || ""}
                      onChange={(e) => setData('title', e.target.value)}
                    />
                    <aside className={data.title.length > 255 ? 'text-red-500  absolute bottom-[-28px] right-2' : 'absolute bottom-[-28px] right-2 '}>
                      {data.title.length}/255
                    </aside>
                    {data.title.length > 255 && <InputError message={errors.title} className="mt-2"/>}
                  </div>
                </div>

                <div className="col-span-full mt-4">
                  <label htmlFor="description" className="block font-medium text-sm text-gray-700 ">
                    Description
                  </label>
                  <div className='relative'>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[150px] max-h-[500px] focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-6 sm:max-h-[200px] "
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                    <aside className={data.description.length > 500 ? 'text-red-600 absolute bottom-[-28px] right-2' : 'absolute bottom-[-28px] right-2'}>
                      {data.description.length}/500
                    </aside>
                  </div>
                  {data.description.length > 500 &&
                    <InputError message={errors.description} className="mt-2" />}
                  <p className="mt-2 text-sm leading-6 text-gray-600">Vous pouvez modifier le détail votre tâche.</p>
                </div>

                <div className="col-span-full mt-4 sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                    Catégorie
                  </label>
                  <div>
                    <select
                      id="category"
                      name="category"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={data.category}
                      onChange={(e) => setData('category', e.target.selectedOptions[0].value)}
                    >
                      <option value="Sans catégorie">🏷️ Sans catégorie</option>
                      <option value="Voyages">✈ Voyages</option>
                      <option value="Sport">🏈 Sport</option>
                      <option value="Finance">💸 Finance</option>
                      <option value="Professionnel">💼 Professionnel</option>
                      <option value="Autre">⚙️ Autre</option>
                    </select>
                  </div>
                </div>

                <div className='relative mt-5'>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={data.isDone}
                      onChange={(e) => setData('isDone', e.target.checked)}
                      onClick={handleUpdateIsDone}
                    >
                    </input>
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tâche effectuée</span>
                  </label>
                </div>

                <div className="inline-flex font-semibold  relative">
                  <DatePicker
                    value={selectedDate && selectedDate.toLocaleDateString('fr-FR')}
                    onChange={handleChange}
                  />
                  {selectedDate && (
                    <button
                      className="px-1  mt-3 text-red-600 hover:text-red-800"
                      onClick={() => {
                        setSelectedDate(null);
                        setData('due_date', null);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                      </svg>

                    </button>
                  )}
                </div>

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton className="ml-4">
                    <Link href={route('task.index')}>
                      Retour
                    </Link>
                  </PrimaryButton>
                  <PrimaryButton className="ml-4" >
                    Modifier et enregistrer
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
