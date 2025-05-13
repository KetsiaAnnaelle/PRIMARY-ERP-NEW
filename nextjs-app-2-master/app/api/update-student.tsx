import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Importer useMutation
import axios from "axios";
import swal from "sweetalert";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GetTeacher } from "./get-teacher";
import { GetClasses } from "./get-classe";
import { GetParents } from "./get-parents";
import { GetTransport } from "./get-transport";

function UpdateStudent({ studentId, onClose }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const queryClient = useQueryClient();

  const { data: studentData, isLoading, isError } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => axios.get(`http://localhost:8000/api/student/${studentId}`).then(res => res.data),
    enabled: !!studentId,
  });

  const { data: parents, isLoading: parentsLoading, isError: parentsIsError } = useQuery({
    queryKey: ['parents'],
    queryFn: GetParents,
  });

  const { data: classes, isLoading: classesLoading, isError: classesIsError } = useQuery({
    queryKey: ['classes'],
    queryFn: GetClasses,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await axios.put(`http://localhost:8000/api/update-student/${studentId}`, data);
    },
    
    onSuccess: () => {
      onClose(); // Fermer le modal après succès
      queryClient.invalidateQueries(["student", studentId]); // Rafraîchir les données de l'étudiant
      swal("Success", "Student updated successfully", "success");
    },
    onError: () => {
      swal("Error", "An error occurred while updating the student", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // Envoi des données à la mutation
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load student data.</p>;

  const ParentsArray = parents.parents;

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between bg-blue-300 p-4 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Modifier les informations de l'élève</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
              onClick={onClose}
            >
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>

          <Card className="w-full">
            <CardContent>
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
                      defaultValue={studentData?.nomEl || ""}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          value={field.value}
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      defaultValue={studentData?.prenomEl || ""}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          value={field.value}
                          id="surname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      defaultValue={studentData?.date_naissance || ""}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          value={field.value}
                          id="date_naissance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      defaultValue={studentData?.sexe || ""}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="sexe"
                          value={field.value}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      defaultValue={studentData?.classe_id || ""}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="classe"
                          value={field.value}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        >
                          <option value="">Sélectionnez la classe</option>
                          {classes?.map((classe) => (
                            <option key={classe.id} value={classe.id}>
                              {classe.nomCl}
                            </option>
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
                      defaultValue={studentData?.parent_id || ""}
                      render={({ field }) => (
                        <select
                          {...field}
                          id="parent"
                          value={field.value}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        >
                          <option value="">Sélectionnez un parent</option>
                          {ParentsArray?.map((parent) => (
                            <option key={parent.id} value={parent.id}>
                              {parent.nomPar}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>}
                  </div>
                </div>

                <CardFooter className="pt-4">
                  <Button type="submit" className="w-full">
                    Enregistrer
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UpdateStudent;
