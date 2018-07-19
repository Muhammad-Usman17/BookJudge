// lib
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
// src
import BookItem from '../BookItem';
import LoadingBar from '../LoadingBar';

const BookListInner = props => {
  const { books, handleLoadMore, hasMoreItems, totalResults } = props;
  return (
    <div>
      <p>
        {totalResults} results founded.
      </p>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={!hasMoreItems}
        loader={LoadingBar}
      >
        <div>
          {Object.keys(books).map(key => <BookItem key={key} book={books[key]} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default BookListInner;
