import React, { useState } from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from "@/Components/InputError.jsx";
import DatePicker from "@/Components/DatePicker.jsx";

export default function CreateTask({ user }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    category: 'Sans catégorie',
    due_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('task.store'), data);
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    setData('due_date', selectedDate.getTime());
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
                  <div className='relative'>
                    <TextInput
                      id="title"
                      type="text"
                      name="title"
                      className="mt-1 block w-full "
                      autoComplete="off"
                      isFocused={true}
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                    />
                    <aside className={data.title.length > 255 ? 'text-red-500 absolute bottom-[-28px] right-2' : 'absolute bottom-[-28px] right-2'}>
                      {data.title.length}/255
                    </aside>
                  </div>
                  {data.title.length > 255 && <InputError message={errors.title} className="mt-2"/> }
                </div>

                <div className="col-span-full mt-4">
                  <label htmlFor="description" className="block font-medium text-sm text-gray-700">
                    Description
                  </label>
                  <div className='relative'>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  min-h-[150px] max-h-[500px] focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-6 sm:max-h-[200px]"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                    <aside className={data.description.length > 500 ? 'text-red-600 absolute bottom-[-28px] right-2' : ' absolute bottom-[-28px] right-2'}>
                      {data.description.length}/500
                    </aside>
                  </div>
                  {data.description.length > 500 && <InputError message={errors.description} className="mt-2" /> }
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

                <div className="inline-flex font-semibold  relative">
                  <DatePicker
                    value={selectedDate && selectedDate.toLocaleDateString('fr-FR')}
                    onChange={handleChange}
                    setShow={setShowDatePicker}
                    handleClose={handleDatePickerClose}
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
                  <PrimaryButton className="ml-4" disabled={processing}>
                    Ajouter la tâche
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
