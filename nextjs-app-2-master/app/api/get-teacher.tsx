// api.js
export const GetTeacher = async () => {
  const response = await fetch('http://localhost:8000/api/enseignants');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des enseignants');
  }
  return response.json();
};

