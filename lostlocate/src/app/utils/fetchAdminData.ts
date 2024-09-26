const stations = '/api/stations';
const mortuaries = '/api/mortuaries';
const match = '/api/matches';

export const fetchTotalStations = async () => {
    try {
      const response = await fetch(`${stations}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total police stations');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  
  
  export const fetchTotalMortuaries = async () => {
    try {
      const response = await fetch(`${mortuaries}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total mortuaries');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  
  
  
  export const fetchSuccessfulMatches = async () => {
    try {
      const response = await fetch(`${match}`);
      if (!response.ok) {
        throw new Error('Failed to fetch successful matches');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };