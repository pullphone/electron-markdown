import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import __ from 'underscore';

const ipc = require('electron').ipcRenderer;

export default class MarkdownEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialog: false,
    }
  }

  componentWillMount() {
    ipc.on('menu-action', (event, command) => {
      if (command == 'save') {
        this.saveSelectedMarkdown();
      } else if (command == 'delete') {
        this.handleClickDelete();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { markdownList, markdownActions } = this.props;
    const nextMarkdownList = nextProps.markdownList;
    const thisSelected = markdownList.selected;
    const nextSelected = nextMarkdownList.selected;
    if (thisSelected == undefined || nextSelected == undefined) {
      return;
    }

    if (thisSelected.id !== nextSelected.id) {
      this.saveSelectedMarkdown()
    }
  }

  saveSelectedMarkdown() {
    const { markdownList, markdownActions } = this.props;
    const { selected } = markdownList;
    if (selected === undefined) {
      return;
    }

    const stateData = markdownList.list[selected.id];
    // list にあるデータと変わってたら保存
    if (selected.title != stateData.title || selected.content != stateData.content) {
      markdownActions.update(selected.id, selected.title, selected.content);
    }
  }

  handleChange(elm) {
    const { markdownActions } = this.props;
    const { name, value } = elm.target;

    markdownActions.updateSelected(name, value);
  }

  handleClickDelete() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    if (selected == undefined) {
      return;
    }

    this.setState({
      deleteDialog: true,
    });
  }

  getTitleProps() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    return {
      name: 'title',
      className: 'form-control',
      value: selected.title,
      onChange: elm => this.handleChange(elm),
    };
  }

  getContentProps() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    return {
      name: 'content',
      style: {height: 'calc(100% - 100px)', width: '100%'},
      value: selected.content,
      onChange: elm => this.handleChange(elm),
    };
  }

  getDialogProps() {
    return {
      title: 'Delete?',
      actions: [
        <FlatButton label="OK" secondary={true} onTouchTap={() => this.deleteItem()} />,
        <FlatButton label="Cancel" primary={true} onTouchTap={() => this.setState({deleteDialog: false})} keyboardFocused={true} />
      ],
      modal: false,
      open: this.state.deleteDialog,
      onRequestClose: () => this.setState({deleteDialog: false}),
    }
  }

  deleteItem() {
    const { markdownList, markdownActions } = this.props;
    markdownActions.del(markdownList.selected.id);
    this.setState({deleteDialog: false});
  }

  render() {
    const { markdownList } = this.props;
    const { selected } = markdownList;
    if (selected === undefined) {
      return null;
    }

    return (
      <div style={{height: '100%'}}>
        <input {...this.getTitleProps()} />
        <textarea {...this.getContentProps()} />
        <RaisedButton primary={true} onTouchTap={() => this.handleClickDelete()}>Delete</RaisedButton>

        <Dialog {...this.getDialogProps()}>Delete "{selected.title}"?</Dialog>
      </div>
    );
  }
}

MarkdownEdit.propTypes = {
  markdownList: PropTypes.object.isRequired,
  markdownActions: PropTypes.object.isRequired,
};
