// api.js
export const GetClasses = async () => {
  const response = await fetch('http://localhost:8000/api/classes');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des classes');
  }
  return response.json();
};
