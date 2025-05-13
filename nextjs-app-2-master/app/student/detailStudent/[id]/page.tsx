"use client"; // Indiquer que ce composant est côté client

import { useParams } from "next/navigation";  // Utiliser useParams pour les routes dynamiques
import Navbar from "@/app/navbar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid';  // Importer des icônes
import Sidebar from "../../createStudent/sidebar";

function Page() {
  const { id } = useParams();  // Récupérer l'ID depuis l'URL

  const queryClient = useQueryClient();

  const { data: studentData, isLoading, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: () => axios.get(`http://localhost:8000/api/student/${id}`).then(res => res.data),
    enabled: !!id,  // S'assurer que l'ID est disponible avant la requête
  });

  if (isLoading) return <p>Chargement des données de l'élève...</p>;
  if (isError) return <p>Erreur lors du chargement des données de l'élève.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden lg:block w-64 bg-gray-800">
          <Sidebar />
        </aside>

        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              {/* Affichage conditionnel de l'icône selon le sexe */}
              {studentData?.sexe === 'M' ? (
                <UserIcon className="w-24 h-24 mb-3 text-blue-500" />  // Icône homme
              ) : studentData?.sexe === 'F' ? (
                <UserGroupIcon className="w-24 h-24 mb-3 text-pink-500" />  // Icône femme
              ) : (
                <UserIcon className="w-24 h-24 mb-3 text-gray-500" />  // Icône par défaut
              )}

              <h5 className="mb-1 text-xl font-medium text-blue-900 dark:text-white">
                {studentData?.nomEl} {studentData?.prenomEl}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {/* Niveau : {studentData?.level} */}
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ajouter comme ami
                </a>
                <a
                  href="#"
                  className="py-2 px-4 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Envoyer un message
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
