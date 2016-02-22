import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import __ from 'underscore';

const WebFrame = require('electron').webFrame;

import * as MarkdownActions from '../actions/Markdown';

import TopBar from '../components/TopBar';
import MarkdownList from '../components/MarkdownList';
import MarkdownEdit from '../components/MarkdownEdit';
import MarkdownPreview from '../components/MarkdownPreview';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    WebFrame.setZoomLevelLimits(1, 1);
  }

  render() {
    const mainStyle = {
      height: 'calc(100% - 64px)',
      paddingTop: '2px',
      paddingRight: '16px',
      paddingBottom: '2px'
    };

    return (
      <div style={{height: '100%'}}>
        <div className="row" style={{height: '64px'}}>
          <div className="col-md-12">
            <TopBar {...this.props} />
          </div>
        </div>

        <div className="row" style={mainStyle}>
          <div className="col-md-2" style={{height: '100%', overflow: 'scroll'}}>
            <MarkdownList {...this.props} />
          </div>
          <div className="col-md-5" style={{height: '100%', overflow: 'hidden'}}>
            <MarkdownEdit {...this.props} />
          </div>
          <div className="col-md-5" style={{height: '100%', border: '1px solid #000', overflow: 'scroll'}}>
            <MarkdownPreview {...this.props} />
          </div>
        </div>
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
