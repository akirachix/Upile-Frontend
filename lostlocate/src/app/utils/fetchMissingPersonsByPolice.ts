const url= 'api/police';
const matchesUrl = 'api/matches';

export const fetchMissingPersons = async () => {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error('Failed to fetch missing persons data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};



export const fetchSuccessfulMatches = async () => {
  try {
    const response = await fetch(`${matchesUrl}`);
    if (!response.ok) {
      throw new Error('Failed to fetch successful matches data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


