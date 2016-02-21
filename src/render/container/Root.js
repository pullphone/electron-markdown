import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import __ from 'underscore';
import { Grid, Row, Col } from 'react-bootstrap'

import * as MarkdownActions from '../actions/Markdown';

import TopBar from '../components/TopBar';
import MarkdownList from '../components/MarkdownList';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
      <Grid fluid={true}>
        <Row>
          <Col md={12}><TopBar {...this.props} /></Col>
        </Row>

        <Row>
          <Col md={2} key="list1"><MarkdownList {...this.props} /></Col>
          <Col md={5} key="list2"><MarkdownList {...this.props} /></Col>
          <Col md={5} key="list3"><MarkdownList {...this.props} /></Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

Root.propTypes = {
  markdownList: PropTypes.object.isRequired,
  markdownActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    markdownList: state.markdownList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markdownActions: bindActionCreators(MarkdownActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
