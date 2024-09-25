const baseUrl = 'https://lostlocate-1e4e80f4a89c.herokuapp.com/api/missing_persons/';

export const fetchMissingPersonById = async (id: string): Promise<any> => {
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


// export async function GET(request: Request, { params }: { params: { id: string } }) {
//     const baseUrl = process.env.BASE_URL;
  
//     try {
//       const response = await fetch(`${baseUrl}/api/missing_person/${params.id}/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }
  
//       const result = await response.json();
//       return new Response(JSON.stringify(result), {
//         status: 200,
//         statusText: 'Missing Person Fetched Successfully',
//       });
//     } catch (error) {
//       return new Response((error as Error).message, {
//         status: 500,
//       });
//     }
//   }
   
//   export const fetchMissingPersonById = async (id: string) => {
//     try {
//       const response = await fetch(`/api/missing_person/${id}/`);
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch missing person');
//       }
  
//       return await response.json();  
//     } catch (error) {
//       console.error('Error fetching missing person:', (error as Error).message);
//       throw error;
//     }
//   };
  
  
  
  
  
  
  