import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetSchoolYear } from '@/app/api/get-school-year';
import { GetClasses } from '@/app/api/get-classe';
import { GetTeacher } from '@/app/api/get-teacher';
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@mui/material';
import { ButtonLoading } from '@/app/Buttonloading';
import { useDeleteClass } from '@/app/api/delete-class';
import UpdateClass from '@/app/api/update-class';

const schema = yup.object().shape({
  nomCl: yup.string().required('Le nom de la classe est requis'),
  section: yup.string().required('La section est requise'),
  année_scolaire_id: yup.string().required("L'année scolaire est requise"),
  enseignant_id: yup.string().required("Le nom de l'enseignant est requis"),
});

const Modal = () => {

  const deleteClassMutation = useDeleteClass(); //pour supprimer et archiver une classe

  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  //modal pour modifier une classe

  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateClick = (classId) => {
    setSelectedClassId(classId); // Stockez l'ID de la classe sélectionnée
    setIsModalOpen(true);        // Ouvrez le modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);       // Fermez le modal
  };

  const queryClient = useQueryClient();

  // Récupérer les années scolaires
  const { data: schoolYear, error: YearError, isLoading: schoolYearLoading } = useQuery({
    queryKey: ['schoolYear'],
    queryFn: GetSchoolYear,
  });

  // Récupérer les classes
  const { data: classes, error: classeError, isLoading: classeLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: GetClasses,
  });

  // Récupérer les enseignants
  const { data: teacher, error: teacherError, isLoading: teacherLoading } = useQuery({
    queryKey: ['teacher'],
    queryFn: GetTeacher,
  });

  // Mutation pour ajouter une classe
  const addClassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:8000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalider et refetch la requête 'classes' pour mettre à jour la liste
      queryClient.invalidateQueries(['classes']);
      toast.success('Ajouté avec succès');
      reset(); // Réinitialiser le formulaire
      toggleModal(); // Fermer la modal
    },
    onError: (error) => {
      toast.error(`Échec de l'ajout : ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    addClassMutation.mutate(data);
  };

  if (schoolYearLoading || classeLoading || teacherLoading) {
    return <ButtonLoading />;
  }

  if (YearError || classeError || teacherError) {
    return <div>Erreur de chargement des informations</div>;
  }


  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Enregistrer une classe
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between bg-blue-300 p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ajouter
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <Card className="w-full">
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                      {/* Nom de la classe */}
                      <div className="flex flex-col space-y-1.5 mt-6">
                        <Label htmlFor="nomCl">Nom de la classe</Label>
                        <Controller
                          name="nomCl"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              id="nomCl"
                              type="text"
                              {...field}
                              className="w-full"
                            />
                          )}
                        />
                        {errors.nomCl && <span className="text-red-500">{errors.nomCl.message}</span>}
                      </div>

                      {/* Section */}
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="section">Section</Label>
                        <Controller
                          name="section"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger id="section">
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="Francophone">Francophone</SelectItem>
                                <SelectItem value="Anglophone">Anglophone</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.section && <span className="text-red-500">{errors.section.message}</span>}
                      </div>

                      {/* Année scolaire */}
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="année_scolaire_id">Année Scolaire</Label>
                        <Controller
                          name="année_scolaire_id"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <select
                              {...field}
                              id="année_scolaire_id"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            >
                              <option value="">-- Sélectionnez --</option>
                              {schoolYear.map((year) => (
                                <option key={year.id} value={year.id}>
                                  {year.annee_debut} - {year.annee_fin}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        {errors.année_scolaire_id && <span className="text-red-500">{errors.année_scolaire_id.message}</span>}
                      </div>

                      {/* Enseignant */}
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="enseignant_id">Nom de l'enseignant</Label>
                        <Controller
                          name="enseignant_id"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <select
                              {...field}
                              id="enseignant_id"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            >
                              <option value="">-- Sélectionnez --</option>
                              {teacher.map((en) => (
                                <option key={en.id} value={en.id}>
                                  {en.nomEns}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        {errors.enseignant_id && <span className="text-red-500">{errors.enseignant_id.message}</span>}
                      </div>
                    </div>

                    <CardFooter className="flex justify-center mt-6">
                      <Button type="submit" className="w-full bg-slate-400 sm:w-auto">Enregistrer</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Affichage des classes sous forme de cartes */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 p-4'>
      {classes && classes.length > 0 ? (
        classes.map((cl) => (
          <Card
            className="w-[350px] mt-10 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow transition duration-300 ease-in-out transform hover:scale-105 shadow-md group-hover:shadow-lg"
            key={cl.id}
          >
            <CardHeader className="flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FaChalkboardTeacher className="text-2xl" />
                {cl.section}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <FaBook className="text-xl text-gray-600" />
                <Label htmlFor="name" className="text-lg font-medium text-gray-700">
                  Nom de la classe : <span className="font-semibold text-red-500">{cl.nomCl}</span> <br />
                  Nom de l'enseignant : <span className="font-semibold text-red-500">{cl.enseignant? cl.enseignant.nomEns : 'aucun'}</span> <br />
                  Nombre d'élèves : <span className="font-semibold text-red-500"></span>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button className=' text-purple-500'>Visiter</Button>
              <Button className=' text-blue-500' onClick={() => handleUpdateClick(cl.id)}>Modifier</Button>
              <Button className=' text-red-500' onClick={()=>deleteClassMutation.mutate(cl.id)}>Supprimer</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center mt-8 text-gray-600">Pas de classes disponibles</div>
      )}

       {/* Le modal de mise à jour */}
       {isModalOpen && (
        <UpdateClass
          classId={selectedClassId} // Passez l'ID de la classe sélectionnée
          onClose={handleCloseModal} // Passez la fonction pour fermer le modal
        />
      )}
      </div>
    </>
  );
};

export default Modal;
