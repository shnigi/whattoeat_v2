"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
require('dotenv').config();
const yelpApiUrl = 'https://api.yelp.com/v3/graphql';
const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(yelpApiUrl, {
    headers: { Authorization: `Bearer ${process.env.APIKEY}` }
});
router.post('/business/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    query search($latitude: Float!, $longitude: Float!, $offset: Int!) {
      search(
        latitude: $latitude,
        longitude: $longitude,
        offset: $offset
        open_now: true
        term: "food"
      ) {
      total
      business {
        name
        rating
        url
        review_count
        price
        photos
        categories {
          title
        }
        hours {
          is_open_now
          open {
            start
            end
            day
          }
        }
        location {
          address1
          city
          state
          country
        }
      }
    }
  }`;
    const data = yield client.request(query, req.body);
    res.json(data);
}));
module.exports = router;
