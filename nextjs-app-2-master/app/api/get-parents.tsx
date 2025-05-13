// api.js
export const GetParents = async () => {
  const response = await fetch('http://localhost:8000/api/parents');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des parents');
  }
  return response.json();
};
