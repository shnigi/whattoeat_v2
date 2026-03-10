import express, { Request, Response } from "express";
const router = express.Router();
require('dotenv').config();

interface BusinessSearchRequestBody {
  latitude: number;
  longitude: number;
  offset?: number;
}

router.post('/business/search', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.YELP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing Yelp API key (YELP_API_KEY)' });
    }

    const { latitude, longitude, offset = 0 } = req.body as BusinessSearchRequestBody;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'latitude and longitude must be numbers' });
    }

    const parsedOffset = Number.isFinite(offset) ? Math.max(0, Math.trunc(offset)) : 0;
    const searchParams = new URLSearchParams({
      term: 'food',
      latitude: String(latitude),
      longitude: String(longitude),
      open_now: 'true',
      limit: '21',
      offset: String(parsedOffset)
    });

    const yelpResponse = await fetch(`https://api.yelp.com/v3/businesses/search?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const data = await yelpResponse.json();

    if (!yelpResponse.ok) {
      return res.status(yelpResponse.status).json(data);
    }

    return res.json(data);
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to fetch Yelp business search results',
      details
    });
  }
});
module.exports = router;
