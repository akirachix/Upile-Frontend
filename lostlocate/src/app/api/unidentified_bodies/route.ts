const baseURL = process.env.BASE_URL;

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        const response = await fetch(`${baseURL}/api/unidentified_bodies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();

            return new Response(JSON.stringify(data), {
                status: 201,
            });
        } else {
            const textData = await response.text();
            console.error("Non-JSON Response:", textData);

            return new Response(JSON.stringify({ error: `Unexpected response format: ${textData}` }), {
                status: response.status,
            });
        }
    } 
    catch (error) {
        console.error("Error:", error);
        const errors = (error as Error).message;

        return new Response(JSON.stringify({ error: errors }), {
            status: 500,
        });
    }
}



export async function GET() {
    try{
        const response = await fetch(`${baseURL}/api/unidentified_bodies`);
        const data = await response.json();
        return new Response(JSON.stringify(data),{
            status:200,
        });
    } catch (error){
        return new Response((error as Error).message,{
            status:500
        });
    }
}


