//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

//  src
import history from '../../utils/history';
import { loadBooks, PaginateBooks } from '../../redux/actions';
import SearchInner from './SearchInner';

class Search extends Component {
  constructor(props) {
    super(props);
    const query = props.match.params.query;
    this.state = {
      query,
      hasMoreItems: false,
      books: [],
      page: 1,
      totalResults: props.searchResults.totalResults,
      totalPages: props.searchResults.totalPages,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { query } = this.state;
    dispatch(loadBooks(query, 1));
  }

  handleItemClick = id => {
    history.push(`/book/${id}`);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      const { items, totalResults, totalPages } = nextProps.searchResults;
      const entityBooks = nextProps.books;
      const books = items.map(book => entityBooks[book]);
      this.setState({ totalResults, totalPages, books });
    }

    this.setState({ hasMoreItems: false });
  }
  handleLoadMore = () => {
    const { page, query, totalPages } = this.state;
    const { dispatch } = this.props;
    if (page <= totalPages) {
      this.setState({ hasMoreItems: true });
      const pageNo = page + 1;
      dispatch(PaginateBooks(query, pageNo));
      this.setState({ page: page + 1 });
    }
  };

  render() {
    const { books, totalResults, hasMoreItems } = this.state;
    return (
      <div>
        <p>
          {totalResults} results founded.
        </p>
        <SearchInner
          books={books}
          totalResults={totalResults}
          handleLoadMore={this.handleLoadMore}
          hasMoreItems={hasMoreItems}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { searchResults, books } = state;
  return {
    searchResults,
    books,
  };
}
export default connect(mapStateToProps)(Search);
