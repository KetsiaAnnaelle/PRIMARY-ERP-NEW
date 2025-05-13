"use client";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/app/navbar";
import Sidebarconfig from "../Sidebarconfig";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Page() {
  const [annee_debut, setannee_debut] = useState('');
  const [annee_fin, setannee_fin] = useState('');
  const [trimestre, settrimestre] = useState('');
  const [date_debut, setdate_debut] = useState('');
  const [date_fin, setdate_fin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!annee_debut || !annee_fin) {
      setError('Les champs "année_debut" et "année_fin" sont requis.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/school-year', {
        annee_debut: annee_debut,
        annee_fin: annee_fin,
        trimestre: trimestre,
        date_debut: date_debut,
        date_fin: date_fin,
      });

      console.log("Response:", response); // Ajouté pour débogage

      // Vérifie la structure de la réponse
      if (!response.data.error) {
     
        toast.success("Informations Enregistrées");
        setannee_debut('');
        setannee_fin('');
        settrimestre('')
        setdate_debut('')
        setdate_fin('')
    
      } else {
        setError(response.data.message );
        toast.error("Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Request failed: ", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Une erreur est survenue.');
        // toast.error(error.response.data.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
        // toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-gray-800">
          <Sidebarconfig />
        </aside>

        {/* Content area */}
        <main className="flex-1 p-4 flex justify-center items-center bg-gray-50 mt-20">
          <Card className="w-[500px] place-content-center mx-10">
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
                    <Label htmlFor="annee_debut">Année Début</Label>
                    <Input
                      id="annee_debut"
                      type="date"
                      value={annee_debut}
                      onChange={(e) => setannee_debut(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="annee_fin">Année Fin</Label>
                    <Input
                      id="annee_fin"
                      type="date"
                      value={annee_fin}
                      onChange={(e) => setannee_fin(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1 5">
                    <Select value={trimestre} onValueChange={(value) => settrimestre(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="choisir un trimestre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trimestre_1">Trimestre 1</SelectItem>
                        <SelectItem value="trimestre_2">Trimestre 2</SelectItem>
                        <SelectItem value="trimestre_3">Trimestre 3</SelectItem>
                      </SelectContent>
                    </Select>

                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date_debut">Date de debut du trimestre</Label>
                    <Input
                      id="date_debut"
                      type="date"
                      value={date_debut}
                      onChange={(e) => setdate_debut(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date_fin">Date de fin du trimestre</Label>
                    <Input
                      id="date_fin"
                      type="date"
                      value={date_fin}
                      onChange={(e) => setdate_fin(e.target.value)}
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-center mt-6 gap-4">
                  <Button type="submit">Enregistrer</Button>
                  <Button type="reset" className="bg-yellow-400">Annuler</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Page;
