const baseUrl = '/api/missing_persons/';

export const fetchData = async () => {
  try {
    const url =  `${baseUrl}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch missing persons');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching missing persons:', (error as Error).message);
    throw error;
  }
};
