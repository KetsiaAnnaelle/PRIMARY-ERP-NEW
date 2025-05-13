export const GetMatiere = async () => {
  const response = await fetch('http://localhost:8000/api/matieres');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des parents');
  }
  return response.json();
};
