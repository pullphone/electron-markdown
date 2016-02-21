import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class MarkdownList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar title="Elenctron Markdown" />
    );
  }
}

MarkdownList.propTypes = {
  markdownList: PropTypes.object.isRequired,
  markdownActions: PropTypes.object.isRequired,
};
