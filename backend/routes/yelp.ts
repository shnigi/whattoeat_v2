import express, { Request, Response } from 'express';
const router = express.Router();
require('dotenv').config();

const GOOGLE_PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const GOOGLE_PLACES_PHOTO_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const PAGE_SIZE = 20;
const MAX_PAGE_INDEX = 2;

interface GooglePlacePhoto {
  photo_reference: string;
}

interface GooglePlaceOpeningHours {
  open_now?: boolean;
}

interface GooglePlaceResult {
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: GooglePlacePhoto[];
  types?: string[];
  opening_hours?: GooglePlaceOpeningHours;
  vicinity?: string;
  place_id?: string;
}

interface GooglePlacesSearchResponse {
  status: string;
  error_message?: string;
  next_page_token?: string;
  results?: GooglePlaceResult[];
}

interface RestaurantCard {
  name: string;
  rating: number;
  url: string;
  review_count: number;
  price?: string;
  image_url?: string;
  photos?: string[];
  categories: { title: string }[];
  hours?: { is_open_now: boolean; open: { start: string; end: string; day: number }[] }[];
  location: {
    address1?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

const prettifyPlaceType = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const buildPhotoUrl = (photoReference: string, apiKey: string) =>
  `${GOOGLE_PLACES_PHOTO_URL}?maxwidth=800&photo_reference=${encodeURIComponent(photoReference)}&key=${encodeURIComponent(apiKey)}`;

const mapPriceLevel = (priceLevel?: number) => {
  if (!priceLevel || priceLevel < 1) {
    return undefined;
  }

  return '$'.repeat(priceLevel);
};

const mapPlaceToRestaurant = (place: GooglePlaceResult, apiKey: string): RestaurantCard => {
  const photoUrls = (place.photos ?? []).map((photo) =>
    buildPhotoUrl(photo.photo_reference, apiKey)
  );
  const visibleTypes = (place.types ?? []).filter(
    (type) => !['food', 'point_of_interest', 'establishment'].includes(type)
  );
  const categories = (visibleTypes.length > 0 ? visibleTypes : ['restaurant'])
    .slice(0, 3)
    .map((type) => ({ title: prettifyPlaceType(type) }));

  return {
    name: place.name ?? 'Unknown restaurant',
    rating: place.rating ?? 0,
    url: place.place_id
      ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(place.place_id)}`
      : 'https://www.google.com/maps',
    review_count: place.user_ratings_total ?? 0,
    price: mapPriceLevel(place.price_level),
    image_url: photoUrls[0],
    photos: photoUrls,
    categories,
    hours:
      place.opening_hours?.open_now === undefined
        ? undefined
        : [{ is_open_now: place.opening_hours.open_now, open: [] }],
    location: {
      address1: place.vicinity
    }
  };
};

const waitFor = async (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const fetchGooglePlacesPage = async (
  apiKey: string,
  latitude: number,
  longitude: number,
  pageToken?: string
): Promise<GooglePlacesSearchResponse> => {
  const searchParams = new URLSearchParams(
    pageToken
      ? {
          pagetoken: pageToken,
          key: apiKey
        }
      : {
          location: `${latitude},${longitude}`,
          radius: '3000',
          type: 'restaurant',
          opennow: 'true',
          key: apiKey
        }
  );

  const response = await fetch(`${GOOGLE_PLACES_SEARCH_URL}?${searchParams.toString()}`);
  return response.json() as Promise<GooglePlacesSearchResponse>;
};

const fetchGooglePlacesResults = async (
  apiKey: string,
  latitude: number,
  longitude: number,
  pageIndex: number
): Promise<GooglePlacesSearchResponse> => {
  let searchResponse = await fetchGooglePlacesPage(apiKey, latitude, longitude);

  for (let currentPage = 1; currentPage <= pageIndex; currentPage += 1) {
    const pageToken = searchResponse.next_page_token;
    if (!pageToken) {
      return {
        status: 'ZERO_RESULTS',
        results: []
      };
    }

    // Google may return INVALID_REQUEST briefly before the next page token becomes active.
    let nextPageResponse: GooglePlacesSearchResponse = { status: 'INVALID_REQUEST' };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await waitFor(2000);
      nextPageResponse = await fetchGooglePlacesPage(apiKey, latitude, longitude, pageToken);
      if (nextPageResponse.status !== 'INVALID_REQUEST') {
        break;
      }
    }

    searchResponse = nextPageResponse;
  }

  return searchResponse;
};

interface BusinessSearchRequestBody {
  latitude: number;
  longitude: number;
  offset?: number;
}

router.post('/business/search', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_API;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing Google Places API key (GOOGLE_API)' });
    }

    const { latitude, longitude, offset = 0 } = req.body as BusinessSearchRequestBody;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'latitude and longitude must be numbers' });
    }

    const parsedOffset = Number.isFinite(offset) ? Math.max(0, Math.trunc(offset)) : 0;
    const pageIndex = Math.trunc(parsedOffset / PAGE_SIZE);

    if (pageIndex > MAX_PAGE_INDEX) {
      return res.json({ businesses: [] });
    }

    const data = await fetchGooglePlacesResults(apiKey, latitude, longitude, pageIndex);

    if (data.status === 'ZERO_RESULTS') {
      return res.json({ businesses: [] });
    }

    if (data.status !== 'OK') {
      return res.status(502).json({
        error: data.error_message || `Google Places request failed with status ${data.status}`
      });
    }

    return res.json({
      businesses: (data.results ?? []).map((place) => mapPlaceToRestaurant(place, apiKey))
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to fetch Google Places search results',
      details
    });
  }
});
module.exports = router;
