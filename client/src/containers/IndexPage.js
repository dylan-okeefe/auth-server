import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from './../components/Header';

class IndexPage extends Component {
  render() {
    const { user } = this.props;
    return (
        <div>
          <Header title="Plantr" />
          <div className="col col-12 p2">
          </div>
        </div>
    )
  }
}

export default IndexPage;
