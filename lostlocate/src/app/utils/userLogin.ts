const url = 'api/login'
export const userLogin = async (loginData: { generated_code: string; phone_number: string }) => {
  try {
    if (!url) {
      throw new Error('Base URL not set.');
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    // if (!response.ok) {
    //   const error = await response.json();
    //   return { error: error.detail || 'Login failed. Invalid generated_code or phone_number.' };
    // }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { error: 'An error occurred. Please try again later.' };
  }
};