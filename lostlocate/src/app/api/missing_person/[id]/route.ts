import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing id parameter', {
      status: 400,
    });
  }

  try {
    const response = await fetch(`https://lostlocate-1e4e80f4a89c.herokuapp.com/api/missing_persons/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`HTTP error! Status: ${response.status}, Message: ${errorText}`, {
        status: response.status,
      });
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: 'Missing Person Fetched Successfully',
    });
  } catch (error) {
    console.log('Error:', (error as Error).message);

    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
