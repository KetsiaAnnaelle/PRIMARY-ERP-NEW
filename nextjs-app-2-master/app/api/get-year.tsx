
export const GetYear = async () => {
  const response = await fetch('http://localhost:8000/api/school-year');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des annees');
  }
  return response.json();
};