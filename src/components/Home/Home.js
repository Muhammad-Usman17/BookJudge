//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

//  src
import Header from '../Header';
import AutoSuggest from '../AutoSuggest';

class Home extends Component {
  componentDidMount() {}

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Home);
