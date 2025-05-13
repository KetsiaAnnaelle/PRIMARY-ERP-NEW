// api.js
export const GetNotes = async () => {
  const response = await fetch('http://localhost:8000/api/notes');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des parents');
  }
  return response.json();
};
