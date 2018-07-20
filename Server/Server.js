//  lib
const express = require('../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express');
const axios = require('axios');
const xmlParse = require('../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/xml2js');
const url = require('url');
const cors = require('../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/cors');

//  src
const config = require('./config.json');

const app = express();
const router = express.Router();
const port = 4000;
app.use(cors());
app.use('/api', router);

const getBooks = (query, page) =>
  axios.get(
    `${config.baseUrl}search/index.xml?key=${config.apiKey}&q=
				 ${query}&search[field]=title&page=${page}`,
    {
      'Access-Control-Allow-Origin': '*',
    }
  );

router.get('/books', async (request, response) => {
  const urlParts = url.parse(request.url, true);
  const parameters = urlParts.query;
  const query = parameters.query;
  const page = parameters.page;
  getBooks(query, page)
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
