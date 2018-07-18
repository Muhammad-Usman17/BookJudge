//  lib
const express = require('express');
const axios = require('axios');
const xmlParse = require('xml2js');
const url = require('url');
const cors = require('cors');

//  src
const config = require('./Config.json');

const app = express();
const router = express.Router();
const port = 4000;
app.use(cors());
app.use('/api', router);

const getBooks = (query, page) => {
  try {
    return axios.get(
      `${config.baseUrl}search/index.xml?key=${config.apiKey}&q=
				 ${query}&search[field]=title&page=${page}`,
      {
        'Access-Control-Allow-Origin': '*',
      }
    );
  } catch (error) {
    console.error(error);
  }
};

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
      // response.json(book);
      response.send({ book });
      return book;
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
