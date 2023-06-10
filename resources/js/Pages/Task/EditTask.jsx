import React from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from "@/Components/InputError.jsx";


export default function EditTask({ user, task }) {
  const { data, setData, put, errors } = useForm({
    title: task.title,
    description: task.description || " ",
    category: task.category,
    isDone: task.isDone
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = route('task.update', { task: task.id });
    put(url, data);
  };

  const handleUpdateIsDone = (e) => {
    e.preventDefault();
    const url = route('task.updateIsDone', { task: task.id });

    router.put(url);
  };

  return (
    <AuthenticatedLayout
      user={user.name}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Ajouter des tâches
        </h2>
      }
    >
      <Head title="Ajout tâche" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">


            <div className="p-6 text-gray-900">

              <form onSubmit={handleSubmit}>
                <div>
                  <InputLabel htmlFor="text" value="Titre" />

                  <TextInput
                    id="title"
                    type="text"
                    name="title"
                    //value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="off"
                    isFocused={true}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                  />

                  <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="col-span-full mt-4">
                  <label htmlFor="description" className="block font-medium text-sm text-gray-700 ">
                    Description
                  </label>
                  <div>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[150px] max-h-[500px] focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-6 sm:max-h-[200px] "
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                />
                  </div>
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
