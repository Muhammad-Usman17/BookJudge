//  lib
import React from 'react';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';

const AutoSuggestInner = props => {
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
  } = props;
  return (
    <div>
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
          placeholder: 'Search Book',
          value,
          onChange: handleChange,
        }}
      />

      <Button onClick={onClickSearch}> Search </Button>
    </div>
  );
};

export default AutoSuggestInner;
