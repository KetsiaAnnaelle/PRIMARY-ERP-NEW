export const GetEleve = async() =>{
  const response = await fetch("http://localhost:8000/api/create-student");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des étudiants");
  }
  return response.json();
};
