// @flow
//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

//  src
import history from '../../utils/history';
import { loadBooks, loadMoreBooks } from '../../redux/actions';
import BookListInner from './BookListInner';

type Props = {
  totalPages: number,
  match: string,
  dispatch: Function,
  books: Object,
  totalResults: Number,
};

class BookList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreItems: false,
      page: 1,
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { query } = params;
    dispatch(loadBooks(query, 1));
  }

  componentWillReceiveProps() {
    this.setState({ hasMoreItems: false });
  }

  handleLoadMore = () => {
    const { page } = this.state;
    const { dispatch, match: { params }, totalPages } = this.props;
    const query = getOr('', 'query')(params);
    if (page <= totalPages) {
      const pageNo = page + 1;
      dispatch(loadMoreBooks(query, pageNo));
      this.setState(() => ({ page: pageNo, hasMoreItems: true }));
    } else {
      this.setState(() => ({ hasMoreItems: true }));
    }
  };
  handleItemClick = id => {
    history.push(`/book/${id}`);
  };

  render() {
    const { hasMoreItems } = this.state;
    const { books, totalResults } = this.props;
    return (
      <BookListInner
        books={books}
        totalResults={totalResults}
        handleLoadMore={this.handleLoadMore}
        hasMoreItems={hasMoreItems}
      />
    );
  }
}
function mapStateToProps(state) {
  const booksData = getOr({}, 'books.mainReducer')(state);
  const books = getOr({}, 'books')(booksData);
  const totalPages = getOr(0, 'totalPages')(booksData);
  const totalResults = getOr(0, 'totalResults')(booksData);
  return {
    booksData,
    books,
    totalPages,
    totalResults,
  };
}
export default connect(mapStateToProps)(BookList);
