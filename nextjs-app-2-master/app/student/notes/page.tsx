"use client";

import Navbar from "@/app/navbar";
import Sidebar from "../createStudent/sidebar";
import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GetEleve } from "@/app/api/get-eleve";
import { GetMatiere } from "@/app/api/get-matiere";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Define form data types
interface FormData {
  note: number;
  eleve_id: string;
  matière_id: string;
  evaluation_id?: string; // facultatif
  projet_id?: string;     // facultatif
}

// Form validation schema
const schema = yup.object().shape({
  note: yup.number().required('La note est requise').positive().integer(),
  eleve_id: yup.string().required("Le nom de l'élève est requis"),
  matière_id: yup.string().required('La matière est requise'),
  evaluation_id: yup.string().optional(),
  projet_id: yup.string().optional(),
});

function Page() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = useQueryClient();

  const { data: eleve, error: eleveError, isLoading: eleveLoading } = useQuery({
    queryKey: ['eleve'],
    queryFn: GetEleve,
  });

  const { data: matiere, error: matiereError, isLoading: matiereLoading } = useQuery({
    queryKey: ['matiere'],
    queryFn: GetMatiere,
  });

  // Requête pour récupérer les notes
  const { data: notes, error: notesError, isLoading: notesLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/notes');
      if (!response.ok) {
        throw new Error('Erreur de chargement des notes');
      }
      return response.json();
    },
  });

  // Mutation pour soumettre le formulaire
  const addNoteMutation = useMutation({
    mutationFn: async (newNote: FormData) => {
      const response = await fetch('http://localhost:8000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout de la note');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Note ajoutée avec succès !");
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // Invalider la requête pour rafraîchir les notes
      reset();
      toggleModal();
    },
    onError: (error: any) => {
      toast.error(`Erreur: ${error.message || 'Une erreur est survenue.'}`);
    },
  });

  const onSubmit = (data: FormData) => {
    const payload: FormData = {
      note: data.note,
      eleve_id: data.eleve_id,
      matière_id: data.matière_id,
      evaluation_id: data.evaluation_id || null, 
      projet_id: data.projet_id || null,         
    };

    console.log("Payload avant soumission :", payload);
    addNoteMutation.mutate(payload);
  };

  if (eleveLoading || matiereLoading || notesLoading) {
    return <div>Chargement...</div>;
  }

  if (eleveError || matiereError || notesError) {
    return <div>Erreur de chargement des informations</div>;
  }

  const MatieresArray = matiere || [];

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 sm:ml-64">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-6 px-5 py-2.5 text-center mt-20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ajouter une note
        </button>

        {isOpen && (
          <div
            id="crud-modal"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ajouter une note
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={toggleModal}
                  >
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                      aria-hidden="true"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    {/* Note input */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Note
                      </label>
                      <Controller
                        name="note"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          />
                        )}
                      />
                      {errors.note && <p className="text-red-500">{errors.note.message}</p>}
                    </div>

                    {/* Matière input */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Matière
                      </label>
                      <Controller
                        name="matière_id"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          >
                            <option value="">-- Sélectionnez --</option>
                            {MatieresArray.map((mat) => (
                              <option key={mat.id} value={mat.id}>
                                {mat.nomMat}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.matière_id && <p className="text-red-500">{errors.matière_id.message}</p>}
                    </div>

                    {/* Eleve input */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Élève
                      </label>
                      <Controller
                        name="eleve_id"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          >
                            <option value="">-- Sélectionnez --</option>
                            {eleve.map((el) => (
                              <option key={el.id} value={el.id}>
                                {el.nomEl}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.eleve_id && <p className="text-red-500">{errors.eleve_id.message}</p>}
                    </div>

                    {/* Evaluation input */}
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Évaluation (facultatif)
                      </label>
                      <Controller
                        name="evaluation_id"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="ID d'évaluation"
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          />
                        )}
                      />
                    </div>

                    {/* Projet input */}
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Projet (facultatif)
                      </label>
                      <Controller
                        name="projet_id"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="ID de projet"
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Table des notes */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Élève</th>
                <th scope="col" className="px-6 py-3">Matière</th>
                <th scope="col" className="px-6 py-3">Note</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>``
            <tbody>
              {notesLoading && <tr><td colSpan={4}>Chargement...</td></tr>}
              {notesError && <tr><td colSpan={4}>Erreur de chargement des notes</td></tr>}
              {notes?.map(note => (
                <tr key={note.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {note.eleve.nomEl}
                  </th>
                  <td className="px-6 py-4">{note.matiere.nomMat}</td>
                  <td className="px-6 py-4">{note.note}</td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Page;
