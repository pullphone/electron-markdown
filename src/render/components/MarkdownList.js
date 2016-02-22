import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class MarkdownList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List subheader="Markdown List">
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:00:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
        <ListItem primaryText="Title" secondaryText="2016/2/22 00:01:00" />
      </List>
    );
  }
}

MarkdownList.propTypes = {
  markdownList: PropTypes.object.isRequired,
  markdownActions: PropTypes.object.isRequired,
};
