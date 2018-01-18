import React, { Component, PropTypes } from 'react';
import * as actionTypes from './../actions/';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from './../components/Header';

class IndexPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionTypes.default.fetchValidationIfNeeded());
  }

  render() {
    const { validate } = this.props;
    return (
        <div>
          <Header title="Plantr" />
          <div className="col col-12 p2">
            <ul>
              <li>
                { validate.error && this.renderValidationFailed() }
              </li>
            </ul>
          </div>
        </div>
    )
  }

  renderValidationFailed() {
    return(
      <div>
        Eventual Link to Log in...
        </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { validate } = state;
  return {
    validate
  }
}

export default connect(
  mapStateToProps
)(IndexPage);
