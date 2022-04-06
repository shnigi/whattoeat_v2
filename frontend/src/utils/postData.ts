import { iCard } from '../components/Card';
interface PostData {
  latitude: number;
  longitude: number;
  offset: number;
}

interface iRestaurants {
  search: {
    business: iCard[];
  };
}

async function postData(url = '', data: PostData): Promise<iRestaurants> {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}
export default postData;
