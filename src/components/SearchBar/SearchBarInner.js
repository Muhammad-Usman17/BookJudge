//  lib
import React from 'react';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//  src
import './SearchBar.css';

const SearchBarInner = props => {
  const {
    renderInput,
    books,
    handleSuggestionsFetchRequested,
    handleSuggestionsClearRequested,
    renderSuggestionsContainer,
    onSuggestionSelected,
    renderSuggestion,
    getSuggestionValue,
    value,
    handleChange,
    onClickSearch,
    onKeyPress,
  } = props;
  return (
    <Card>
      <CardMedia image="../../images/Books.jpg" />
      <CardContent className="SearchBar-content">
        <div className="SearchBar-autocomplete">
          <Autosuggest
            renderInputComponent={renderInput}
            suggestions={books}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            onSuggestionSelected={onSuggestionSelected}
            renderSuggestion={renderSuggestion}
            getSuggestionValue={getSuggestionValue}
            inputProps={{
              placeholder: 'Book Name',
              value,
              onChange: handleChange,
              onKeyPress,
            }}
          />
        </div>

        <Button
          className="SearchBar-button"
          variant="outlined"
          color="secondary"
          onClick={onClickSearch}
        >
          {' '}Search{' '}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchBarInner;
