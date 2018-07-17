const express = require('express');
const axios = require('axios');
const fetch = require('node-fetch');

const xmlParse = require('xml2js');
const url = require('url');

const config = require('./Config.json');

const app = express();
const router = express.Router();
const port = 4000;

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/

router.get('/books', async (request, response) => {
  const urlParts = url.parse(request.url, true);
  const parameters = urlParts.query;
  const query = parameters.query;
  const page = parameters.page;
  const books = getBooks(query, page)
    .then(res => {
      const parseString = xmlParse.parseString;
      let book = res.data;
      parseString(res.data, (err, result) => {
        book = result.GoodreadsResponse.search;
      });
      book[0].page = page;
      response.json({ book });
      return book;
    })
    .catch(error => {
      console.log(error);
    });
});

const getBooks = (query, page) => {
  let source = axios.CancelToken.source();
  source.cancel('Canceled previous Request');
  source = axios.CancelToken.source();
  const con = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    cancelToken: source.token,
  };
  try {
    return axios.get(
      `${config.baseUrl}search/index.xml?key=${config.apiKey}&q=
				 ${query}&search[field]=title&page=${page}`,
      con
    );
  } catch (error) {
    console.error(error);
  }
};

app.listen(port, () => console.log(`Listening on port ${port}`));
