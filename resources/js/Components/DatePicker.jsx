import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const DatePicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const options = {
    title: "Choisir une date d'échéance",
    autoHide: true,
    todayBtn: true,
    todayBtnText: "Aujourd'hui",
    weekDays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    clearBtn: true,
    clearBtnText: "Supprimer",
    theme: {
      background: "bg-gray-100 shadow-xl",
      todayBtn: "bg-indigo-600 hover:bg-slate-300",
      selected: "bg-indigo-600 hover:bg-slate-300",
      icons: "bg-slate-200 hover:bg-slate-300",
    },
    icons: {
      prev: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      ),
      next: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      ),
    },
    datepickerClassNames: "top-[-850%] left-[-15px]",
    defaultDate: "",
    language: "fr",
  };

  const handleChange = (selectedDate) => {
    onChange(selectedDate);
  };

  const handleDatePickerClose = () => {
    setShow(false);
  };



  return (
    <div className="inline-flex mt-4 px-0 font-semibold shadow-sm relative">
      {show && (
        <>
          <div
            className="absolute top-[-820%] right-[-35%]"
            style={{
              zIndex: 100,
            }}
          >
            <button
              className="text-gray-900 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500  w-6 h-6 flex items-center justify-center"
              onClick={handleDatePickerClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>

            </button>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}

      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={setShow}
      >
        <input
          type="text"
          className="text-gray-900 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:leading-6"
          placeholder="Selectionner une date"
          value={value ? value : ''}
          onFocus={() => setShow(true)}
          readOnly
        />
      </Datepicker>

    </div>
  );
};

export default DatePicker;
