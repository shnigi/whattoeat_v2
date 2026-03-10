import { iCard } from '../components/Card';
interface PostData {
  latitude: number;
  longitude: number;
  offset: number;
}

interface iRestaurants {
  businesses: iCard[];
}

const postData = async (url = '', data: PostData): Promise<iRestaurants> => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const rawBody = await response.text();
  let parsedBody: iRestaurants | { error?: { description?: string } | string } | null = null;

  if (rawBody) {
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      parsedBody = { error: rawBody };
    }
  }

  if (!response.ok) {
    const errorMessage =
      (typeof parsedBody?.error === 'object' && parsedBody?.error?.description) ||
      (typeof parsedBody?.error === 'string' && parsedBody.error) ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return parsedBody as iRestaurants;
}

const fetchMyAPI = async (latitude: number, longitude: number, offset: number) => {
  const api = '/api/business/search';
  const data = await postData(api, {
    latitude: latitude,
    longitude: longitude,
    offset
  });
  const shuffledRestaurants = [...data.businesses].sort(() => Math.random() - 0.5);
  return shuffledRestaurants;
};

export {
  fetchMyAPI
}
