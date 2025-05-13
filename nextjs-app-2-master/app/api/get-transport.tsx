
export const GetTransport = async () => {
  const response = await fetch('http://localhost:8000/api/transports-scolaires');
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des transports');
  }
  return response.json();
};