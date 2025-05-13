import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusCircledIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { useState } from "react";
import axios from "axios"; // Import axios

function SchoolYear() {
  const [annee_debut, setannee_debut] = useState('');
  const [annee_fin, setannee_fin] = useState('');
  const [error, setError] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error message

    if (!annee_debut || !annee_fin) {
      setTimeout(() => {
        setError('annee_debut and annee_fin are required.');
      }, 1000);
      return;
    }

    try {
      // Use axios to send the request
      const response = await axios.post('http://localhost:8000/api/school-year', {
        annee_debut: annee_debut,
        annee_fin: annee_fin,
      });

      console.log(response.data);
      

      if (response.status === 200 && !response.data.error) {
        toast.success("Informations Enregistrées");
        setannee_debut('');
        setannee_fin('');
      } else {
        setError(response.data.message );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      console.error("Request failed: ", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <PlusCircledIcon /> Annee Scolaire
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <Card className="w-[350px] place-content-center mx-10">
            <CardHeader>
              <CardTitle className="text-center">Ajouter une Année Scolaire</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {error && (
                    <Alert>
                      <RocketIcon className="h-4 w-4" />
                      <AlertDescription className="text-red-500 text-center">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="annee_debut">Annee_debut</Label>
                    <Input
                      id="annee_debut"
                      type="date"
                      value={annee_debut}
                      onChange={(e) => setannee_debut(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="annee_fin">Annee_fin</Label>
                    <Input
                      id="annee_fin"
                      type="date"
                      value={annee_fin}
                      onChange={(e) => setannee_fin(e.target.value)}
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-center mt-6">
                  <Button type="submit">Enregistrer</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default SchoolYear;
