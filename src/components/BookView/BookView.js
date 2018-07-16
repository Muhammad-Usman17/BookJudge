//  libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

class BookView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {}

  componentDidMount() {}

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(BookView);
