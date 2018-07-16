//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';
import InfiniteScroll from 'react-infinite-scroller';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

//  src
import history from '../../utils/history';
import { loadBooks, PaginateBooks } from '../../redux/actions';

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

  handleItemClick(i) {
    history.push(`/book/${i}`);
  }

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
    const { books, totalResults, page, totalPages } = this.state;
    const loader = <CircularProgress />;

    const items = [];

    books.map((book, i) => {
      items.push(
        <ListItem
          button
          onClick={() => {
            this.handleItemClick(book.id);
          }}
        >
          <Avatar src={book.image} />
          <ListItemText primary={book.title} secondary={book.author} />
        </ListItem>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.handleLoadMore}
        hasMore={!this.state.hasMoreItems}
        loader={loader}
      >
        <div>
          {items}
        </div>
      </InfiniteScroll>
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
