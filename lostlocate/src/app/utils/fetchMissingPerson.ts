import { MissingPerson } from "./types";

const baseUrl = 'https://lostlocate-1e4e80f4a89c.herokuapp.com/api/missing_persons/';

export const fetchMissingPersonById = async (id: string): Promise<MissingPerson> => {
    try {
        const response = await fetch(`${baseUrl}${id}`);
        console.log({response});
        
        
        if (!response.ok) {
            throw new Error('Failed to fetch missing person');
        }

        const data = await response.json();
        console.log({data});  
        return data;
    } catch (error) {
        console.error('Error fetching missing person:', error);
        throw error;
    }
};



  
  
  
  
  
  
  