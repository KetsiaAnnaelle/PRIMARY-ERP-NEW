import * as React from "react"
import PeopleIcon from '@mui/icons-material/People';
import Link from "next/link";


function CardAcc(){
  return (

    <div className="container mt-6">
      <div className="columns-4">

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700">
          <Link href="/configSchool" className="flex flex-col items-center pb-10">
            <PeopleIcon className="mb-3 rounded-full shadow-lg text-blue-500"/>
              <h5 className="text-center text-xl font-medium text-gray-900 dark:text-white">Information sur L'ecole</h5>
          </Link>
        </div>

        <div className="w-full mt-6 max-w-sm bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700">
          <Link href='/student/createStudent' className="flex flex-col items-center pb-10">
            <PeopleIcon className="mb-3 rounded-full shadow-lg text-blue-500"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Gestion Des élèves</h5>
          </Link>
        </div>

        <div className="w-full mt-6 max-w-sm bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700">
          <Link href='/student/notes' className="flex flex-col items-center pb-10">
            <PeopleIcon className="mb-3 rounded-full shadow-lg text-blue-500"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Gestion des notes et bulletins</h5>
          </Link>
        </div>

        <div className="w-full mt-6 max-w-sm bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <PeopleIcon className="mb-3 rounded-full shadow-lg text-blue-500"/>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Gestion Du personnel</h5>
          </div>
        </div>

      </div>
    </div>

    

  );
}

export default CardAcc;


