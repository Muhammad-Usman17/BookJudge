//  lib
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

//  src
import BookViewInner from './BookViewInner';

class BookView extends Component {
  constructor(props) {
    super(props);
    const { books, match } = props;
    const { params } = match;
    this.state = {
      bookid: params.id,
      book: books[params.id],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      const { match, books } = this.props;
      const { params } = match;
      const { bookid } = params.id;
      const book = books[bookid];
      this.setState({ bookid, book });
    }
  }

  render() {
    const { book } = this.state;
    return <BookViewInner book={book} />;
  }
}
function mapStateToProps(state) {
  const books = getOr({}, 'books')(state);
  return {
    books,
  };
}
export default connect(mapStateToProps)(BookView);
