import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  console.log('Received POST request at /users/login');
  
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }

  try {
    const { generated_code, phone_number } = await request.json();
    console.log('Parsed request body:', { generated_code, phone_number });

    if (!generated_code || !phone_number) {
      console.error('Validation failed: Missing generated_code or phone_number');
      return NextResponse.json(
        { error: 'Generated code and phone number are required.' },
        { status: 400 }
      );
    }

    console.log('Sending request to backend:', `${baseUrl}/users/login/`);

    const response = await fetch(`${baseUrl}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ generated_code, phone_number }),
    });

    const textResponse = await response.text();
    console.log('Backend response received:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      console.warn('Backend responded with an error:', textResponse);

      try {
        return NextResponse.json(
          { error: textResponse || 'Login failed. Invalid credentials.' },
          { status: response.status }
        );
      } catch (e) {
        console.error('Error parsing backend error response:', e);
        return NextResponse.json(
          { error: (e as Error).message },
          { status: response.status }
        );
      }
    }

    const result = JSON.parse(textResponse);
    console.log('Login successful, response:', result);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('An error occurred during login process:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
