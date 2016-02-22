import React, { Component, PropTypes } from 'react';
import __ from 'underscore';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

const ipc = require('electron').ipcRenderer;

export default class MarkdownList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ipc.on('menu-action', (event, command) => {
      if (command == 'new') {
        this.handleClickNewItem();
      }
    });
  }

  getFormattedDate(date) {
    if (date === undefined) {
      return null;
    }
    const d = (typeof date === 'string') ? new Date(date) : date;

    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hh = ('0' + d.getHours()).slice(-2);
    const mm = ('0' + d.getMinutes()).slice(-2);
    const ss = ('0' + d.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
  }

  handleRequestChange(elm, index) {
    const { markdownActions } = this.props;
    markdownActions.select(index);
  }

  handleClickNewItem() {
    const { markdownActions } = this.props;
    markdownActions.add('untitled', 'input content here...');
  }

  getListItemProps(md) {
    return {
      key: md.id,
      value: md.id,
      primaryText: md.title,
      secondaryText: this.getFormattedDate(md.mtime),
    };
  }

  getListProps() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    return {
      subheader: 'Markdown List',
      valueLink: {
        value: String(selected ? selected.id : ''),
        requestChange: (elm, index) => this.handleRequestChange(elm, index),
      },
    };
  }

  render() {
    const { markdownList } = this.props;
    const list = markdownList.list;
    const listArr = __.map(list, (data, id) => {
      return Object.assign({}, data, {id});
    });

    return (
      <SelectableList {...this.getListProps()}>
        {listArr.map(md => {
          return (
            <ListItem {...this.getListItemProps(md)} />
          );
        })}
        <ListItem value={0} key={0} primaryText="New Item..." onTouchTap={() => this.handleClickNewItem()} />
      </SelectableList>
    );
  }
}

MarkdownList.propTypes = {
  markdownList: PropTypes.object.isRequired,
  markdownActions: PropTypes.object.isRequired,
};
