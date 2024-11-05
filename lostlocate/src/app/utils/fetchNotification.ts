const baseUrl = '/api/matches';

export const fetchNotifications = async () => {
  try {
    const url =  `${baseUrl}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', (error as Error).message);
    throw error;
  }
};



