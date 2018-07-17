// lib
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

// src
import SearchListItem from '../SearchListItem';

const SearchInner = props => {
  const { books, totalResults, handleLoadMore, hasMoreItems } = props;
  const loader = <CircularProgress />;
  const items = [];

  books.map((book, i) => {
    items.push(<SearchListItem book={book} />);
  });

  return (
    <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={!hasMoreItems} loader={loader}>
      <div>
        {items}
      </div>
    </InfiniteScroll>
  );
};
export default SearchInner;
