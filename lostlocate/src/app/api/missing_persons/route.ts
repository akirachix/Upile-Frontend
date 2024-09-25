const baseUrl = process.env.BASE_URL;

export async function GET() {  
    try {
      const response = await fetch(`${baseUrl}/api/missing_persons/`, {
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
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }
  
  
  
  
  
  
  

const baseURL = process.env.BASE_URL;
export async function POST(request: Request) {
    const requestData = await request.json();
    console.log('Received data:', requestData);
   
    try {
        const response = await fetch(`${baseURL}/api/missing_persons/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 201,
        });
    }
    catch (error) {
        const errors = (error as Error).message;
        console.error({ errors });
        return new Response(errors, {
            status: 500,
        });
    }
}
