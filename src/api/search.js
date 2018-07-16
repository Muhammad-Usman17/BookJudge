//  lib
import axios from 'axios';
import * as xmlParse from 'xml2js';
//  src
import * as config from '../Config.json';

class search {
  static getAllBooks(query, page) {
    console.log('api query', query);
    console.log('page', page);
    let source = axios.CancelToken.source();
    source.cancel('Canceled previous Request');
    source = axios.CancelToken.source();
    return axios
      .get(
        `${config.proxyUrl}${config.baseUrl}search/index.xml?key=${config.apiKey}&q=
				 ${query}&search[field]=title&page=${page}`,
        { cancelToken: source.token }
      )
      .then(response => {
        const parseString = xmlParse.parseString;
        let books = response.data;
        parseString(response.data, (err, result) => {
          books = result.GoodreadsResponse.search;
        });
        books[0].page = page;
        console.log(books);
        return books;
      })
      .catch(error => error);
  }
}
export default search;
