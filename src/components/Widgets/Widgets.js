// lib
import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core//ListItem';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

export const renderInput = inputProps => {
  const { ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        ...other,
      }}
    />
  );
};

export const renderSuggestion = suggestion =>
  <ListItem button>
    <Avatar src={suggestion.image} />
    <ListItemText primary={suggestion.title} />
  </ListItem>;

export const renderSuggestionsContainer = options => {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};
