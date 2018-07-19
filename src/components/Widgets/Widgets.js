// lib
import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core//ListItem';
import TextField from '@material-ui/core/TextField';

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

export const renderSuggestion = (suggestion, { query, isHighlighted }) =>
  <ListItem button>
    {suggestion.title}
  </ListItem>;

export const renderSuggestionsContainer = options => {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};
