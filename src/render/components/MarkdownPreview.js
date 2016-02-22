import React, { Component, PropTypes } from 'react';
import __ from 'underscore';
global.React = React;
const md2react = require('md2react');

export default class MarkdownPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    if (selected === undefined) {
      return null;
    }

    const md = md2react(selected.content);
    return (
      <div>{md}</div>
    );
  }
}

MarkdownPreview.propTypes = {
  markdownList: PropTypes.object.isRequired,
};
