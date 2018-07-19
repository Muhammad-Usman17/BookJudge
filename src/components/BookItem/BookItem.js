//  lib
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// src
import history from '../../utils/history';

const BookItem = props => {
  const { book } = props;
  const { id, author, title, image } = book;
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          history.push(`/book/${id}`);
        }}
      >
        <Avatar src={image} />
        <ListItemText primary={title} secondary={author} />
      </ListItem>
      <Divider inset />
    </div>
  );
};
export default BookItem;
