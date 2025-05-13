import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { GetParents } from '@/app/api/get-parents';
import { GetClasses } from '@/app/api/get-classe';
import { GetTransport } from '@/app/api/get-transport';

// Schéma de validation avec yup
const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  surname: yup.string().required('Le prénom est requis'),
  birthday: yup.date().required('La date de naissance est requise').nullable(),
  sexe: yup.string().required('Le sexe est requis'),
  classeId: yup.string().required('La classe est requise'),
  parentId: yup.string().required('Le parent est requis'),
  transportId: yup.string(),
});

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { data: parents, isLoading: parentsLoading, isError: parentsIsError } = useQuery({
    queryKey: ['parents'],
    queryFn: GetParents,
  });

  const { data: classes, isLoading: classesLoading, isError: classesIsError } = useQuery({
    queryKey: ['classes'],
    queryFn: GetClasses,
  });

  const { data: transports, isLoading: transportsLoading, isError: transportsIsError } = useQuery({
    queryKey: ['transports'],
    queryFn: GetTransport,
  });

  // Mutation pour ajouter une Student
  const addStudentMutation = useMutation({
    mutationFn: async (newStudent) => {
      const response = await fetch('http://localhost:8000/api/create-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout de l\eleve');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Elève ajouté avec succès !");
      queryClient.invalidateQueries({ queryKey: ['students'] }); // Invalider la requête pour rafraîchir les Students
      reset();
      toggleModal();
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message || 'Une erreur est survenue.'}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      Student: {
        name: data.name,
        surname: data.surname,
        birthday: data.birthday,
        sexe: data.sexe,
        classeId: data.classeId,
        parentId: data.parentId,
        transportId: data.transportId || null,
      },
    };

    console.log("Payload avant soumission :", payload);
    addStudentMutation.mutate(payload.Student);
  };

  if (parentsLoading || classesLoading || transportsLoading) {
    return <div>Chargement...</div>;
  }

  if (parentsIsError || classesIsError || transportsIsError) {
    return <div>Erreur de chargement des données</div>;
  }
  const ParentsArray = parents.parents;
  
  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Inscrire un élève
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Inscrire un élève
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Fermer modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {/* Champ Nom */}
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nom
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      )}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                  </div>

                  {/* Champ Prénom */}
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Prénom
                    </label>
                    <Controller
                      name="surname"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="surname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      )}
                    />
                    {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
                  </div>

                  {/* Champ Date de Naissance */}
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="date_naissance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Date de Naissance
                    </label>
                    <Controller
                      name="birthday"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          id="date_naissance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      )}
                    />
                    {errors.birthday && <p className="text-red-500">{errors.birthday.message}</p>}
                  </div>

                  {/* Champ Sexe */}
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="sexe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Sexe
                    </label>
                    <Controller
                      name="sexe"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="sexe"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="">Sélectionnez le sexe</option>
                          <option value="M">Masculin</option>
                          <option value="F">Féminin</option>
                        </select>
                      )}
                    />
                    {errors.sexe && <p className="text-red-500">{errors.sexe.message}</p>}
                  </div>

                  {/* Champ Classe */}
                  <div className="col-span-2">
                    <label htmlFor="classe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Classe
                    </label>
                    <Controller
                      name="classeId"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="classe"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="">Sélectionnez la classe</option>
                          {classes.map((classe) => (
                            <option key={classe.id} value={classe.id}>{classe.nomCl}</option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.classeId && <p className="text-red-500">{errors.classeId.message}</p>}
                  </div>

                  {/* Champ Parent */}
                  <div className="col-span-2">
                    <label htmlFor="parent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Parent
                    </label>
                    <Controller
                      name="parentId"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="parent"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="">Sélectionnez le parent</option>
                          {ParentsArray.map((parent) => (
                            <option key={parent.id} value={parent.id}>{parent.nomPar}</option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>}
                  </div>

                  {/* Champ Transport */}
                  <div className="col-span-2">
                    <label htmlFor="transport" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Transport
                    </label>
                    <Controller
                      name="transportId"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="transport"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="">Sélectionnez le transport</option>
                          {transports.map((transport) => (
                            <option key={transport.id} value={transport.id}>{transport.itineraire}</option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Soumettre
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
