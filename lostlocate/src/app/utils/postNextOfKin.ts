import { MissingPersonData, nextofkin } from "./types";

const url = '/api/nextofkin'
export const postNextOfKin = async (details: MissingPersonData) => {

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details.nextofkin),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw new Error('Failed to post data');
  }
};