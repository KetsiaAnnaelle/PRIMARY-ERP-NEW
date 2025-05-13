import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import swal from 'sweetalert';
import { toast } from 'sonner';  // Utilisation de sonner pour des notifications toast

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const confirmation = await swal({
        title: "Êtes-vous sûr de vouloir supprimer cette classe ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        buttons: {
          cancel: "Annuler",
          supprimer: {
            text: "Supprimer",
            className: "btn btn-danger", // Utilisez une classe personnalisée pour le style
            value: "supprimer",
          },
          archiver: {
            text: "Archiver",
            className: "btn btn-success", // Utilisez une classe personnalisée pour le style
            value: "archiver",
          },
        },
        dangerMode: true,
      });

      if (confirmation === "supprimer") {
        // Supprimer la classe
        await axios.delete(`http://localhost:8000/api/delete-student/${id}`);
        swal("Supprimé !", "Cet élève a bien été supprimé.", "success");
      } else if (confirmation === "archiver") {
        // Archiver la classe
        await axios.put(`http://localhost:8000/api/archive-student/${id}`);
        swal("Archivé !", "Votre classe a bien été archivée.", "success");
      } else {
        swal("Annulé", "Votre classe n'a pas été modifiée.", "info");
      }
    },
    onSuccess: () => {
      // Invalider la requête pour rafraîchir la liste des student
      queryClient.invalidateQueries(['student']);
      toast.success('Action réussie');
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message}`);
    },
  });
};

