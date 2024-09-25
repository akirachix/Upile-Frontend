const apiUrl = 'api/unidentified-bodies';
const matches = 'api/matches'

export const fetchUnidentifiedBodies = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error('Failed to fetch unidentified bodies data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};



export const fetchUnidentifiedBodiesPerMonth = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error('Failed to fetch unidentified bodies per month');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};




export const fetchSuccessfulMatches = async () => {
  try {
    const response = await fetch(`${matches}`);
    if (!response.ok) {
      throw new Error('Failed to fetch successful matches');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};