const url = 'api/register'
export const userRegister = async (registerData: { first_name: string; last_name: string; role: string; phone_number: string; email: string; username: string; }) => {
  try {
    if (!url) {
      throw new Error('Base URL not set.');
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.detail || 'Register failed. Invalid Credentials' };
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { error: 'An error occurred. Please try again later.' };
  }
};