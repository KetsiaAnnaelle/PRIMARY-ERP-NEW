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

function UpdateClass({ classId, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const queryClient = useQueryClient(); // Initialiser useQueryClient

  const { data: classData, isLoading, isError } = useQuery({
    queryKey: ["class", classId],
    queryFn: () => axios.get(`http://localhost:8000/api/classes/${classId}`).then(res => res.data),
    enabled: !!classId,
  });

  const { data: teacher, error: teacherError, isLoading: teacherLoading } = useQuery({
    queryKey: ['teacher'],
    queryFn: GetTeacher,
  });

  // Utiliser useMutation pour gérer la mise à jour
  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axios.put(`http://localhost:8000/api/classes/${classId}`, data);
    },
    onSuccess: () => {
      // Fermer le modal après succès
      onClose();
      // Invalider la requête pour obtenir les données mises à jour
      queryClient.invalidateQueries(["class", classId]);
      // Afficher un message de succès
      swal("Success", "Class updated successfully", "success");
    },
    onError: () => {
      // Afficher un message d'erreur
      swal("Error", "An error occurred while updating the class", "error");
    },
  });
  

  const onSubmit = (data) => {
    mutation.mutate(data); // Appeler la mutation avec les données du formulaire
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load class data.</p>;

  return (
    <>
      <div
        id="crud-modal"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between bg-blue-300 p-4 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">Modifier la classe</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={onClose} // Utiliser onClose pour fermer le modal
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
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
                        defaultValue={classData?.nomCl || ""}
                        render={({ field }) => (
                          <Input id="nomCl" type="text" {...field} className="w-full" />
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
                        defaultValue={classData?.section || ""}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
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

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="enseignant_id">Nom de l'enseignant</Label>
                      <Controller
                        name="enseignant_id"
                        control={control}
                        defaultValue={classData?.enseignant.id || ""}
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

                    {/* Autres champs comme Année Scolaire et Enseignant */}
                    {/* Vous pouvez ajouter les autres champs de formulaire de manière similaire */}
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
    </>
  );
}

export default UpdateClass;
