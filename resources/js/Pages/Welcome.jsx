import {Link, Head} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({auth}) {
  return (
    <>
      <Head title="Welcome"/>
      <div
        className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Se connecter
              </Link>

              <Link
                href={route('register')}
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                S'enregistrer
              </Link>
            </>
          )}
        </div>
        <GuestLayout>
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="flex justify-center">
              <ApplicationLogo className='max-w-sm'/>
            </div>

            <div className="text-center mt-8">
              <h1 className="text-2xl font-bold mb-4">Bienvenue sur notre site !</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Pour accéder à nos services, veuillez vous connecter.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Si vous n'avez pas de compte, vous pouvez vous{' '}
                <Link
                  href={route('register')}
                  className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  enregistrer ici
                </Link>
                .
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Nous sommes impatients de vous retrouver ! 😊
              </p>
            </div>
          </div>
        </GuestLayout>

      </div>


    </>
  );
}
