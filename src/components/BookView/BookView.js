//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

//  src
import BookViewInner from './BookViewInner';

class BookView extends Component {
  constructor(props) {
    super(props);
    const { books, match } = props;
    this.state = {
      bookid: match.params.id,
      book: books[match.params.id],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      const { match, books } = this.props;
      const { bookid } = match.params.id;
      const book = books[match.params];
      this.setState({ bookid, book });
    }
  }

  render() {
    const { book } = this.state;
    return <BookViewInner book={book} />;
  }
}
function mapStateToProps(state) {
  return {
    books: state.books,
  };
}
export default connect(mapStateToProps)(BookView);
