import React, {useState} from "react";
import AuthenticatedLayout from './../../Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from "@/Components/InputError.jsx";
import Datepicker from "tailwind-datepicker-react"
import arrowLongLeftIcon from "@heroicons/react/20/solid/esm/ArrowLongLeftIcon.js";

export default function Task({ user }) {


  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    category: 'Sans catégorie',
    due_date: '',
  })
  const handleSubmit = (e) =>{
    e.preventDefault();
    post(route('task.store'), data);
  }

  const options = {
    title: "Choisir une date d'échéance",
    autoHide: true,
    todayBtn: true,
    todayBtnText:'aujourd\'hui',
    weekDays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    clearBtn: false,
    theme: {
      background: "bg-gray-100 shadow-xl",
      todayBtn: "bg-indigo-600 hover:bg-slate-300",
      selected: "bg-indigo-600 hover:bg-slate-300",
      icons:"bg-slate-200 hover:bg-slate-300" ,
    },
    icons: {
      prev: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
      </svg>
      ,
      next: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>,
    },
    datepickerClassNames: "top-[-850%] left-[-15px]",
    defaultDate: '',
    language: "fr",
  }

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate)
    console.log(selectedDate)
  }
  const handleClose = (state) => {
    setShow(state)
  }


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
                    <aside className={data.title.length > 255 ? 'text-red-500  absolute bottom-[-28px] right-2' : 'absolute bottom-[-28px] right-2 '}>
                      {data.title.length}/255
                    </aside>
                  </div>
                  {data.title.length > 255 && <InputError message={errors.title} className="mt-2"/> }
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
                    <aside className={data.description.length > 500 ? 'text-red-600 absolute bottom-[-28px] right-2' : ' absolute bottom-[-28px] right-2'}>
                      {data.description.length}/500
                    </aside>
                  </div>
                  {data.description.length > 500 &&
                    <InputError message={errors.description} className="mt-2" /> }
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

                <div className="inline-flex mt-4 px-0 font-semibold  shadow-sm  relative">

                  <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} >
                    <input type="text" className="rounded-md" placeholder="Select Date" value={selectedDate} onFocus={() => setShow(true)} readOnly />
                  </Datepicker>
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
