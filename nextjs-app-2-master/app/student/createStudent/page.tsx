"use client";

import React, { useState } from "react";
import Navbar from "@/app/navbar";
import Sidebar from "./sidebar";
import { TableStud } from "./table";
import axios from "axios";

// Type pour les étudiants
export type Student = {
  id: string;
  name: string;
  surname: string;
  sexe: string;
  birthday: string; 
  classeId: string;
  parentId: string;
  // transportId?: number; // Facultatif
};

function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour ajouter un élève
  const onAddEleve = async (newEleve: Student) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-student",
        newEleve, // `axios.post` gère la conversion en JSON automatiquement
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Élève ajouté avec succès :", data);

      // Mettre à jour les étudiants après la réponse
      setStudents((prevStudents) => [...prevStudents, data]);
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout de l'élève : " + error.message);
      console.error("Erreur lors de l'ajout de l'élève :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 sm:ml-64 mt-20 mx-10">
        <TableStud students={students} onAddEleve={onAddEleve} />
        {isLoading && <div>Ajout en cours...</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
    </>
  );
}

export default Page;
