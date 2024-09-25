export async function GET(request:Request, {params:{id}}:{params:{id:string}}) {  
    try {
      const response = await fetch('https://lostlocate-1e4e80f4a89c.herokuapp.com/api/missing_persons/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return new Response(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        status: 200,
        statusText: 'Missing Persons Fetched Successfully',
      });
    } catch (error) {
        console.log('ola', (error as Error).message);
        
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }





