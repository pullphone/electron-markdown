import __ from 'underscore';
import * as MarkdownList from '../constants/MarkdownList';


const initiaiList = {
  1: {
    id: 1,
    title: 'sample markdown',
    content: 'sample',
    ctime: new Date(),
    mtime: new Date(),
  },
  2: {
    id: 2,
    title: 'sample markdown 2',
    content: 'sample 2',
    ctime: new Date(),
    mtime: new Date(),
  },
};
const initialState = {
  seqId: 2,
  list: initiaiList,
  selected: initiaiList[1],
};

export default function markdownList(state = initialState, action) {
  const list = Object.assign({} , state.list);
  const id = state.seqId + 1;
  let selected = undefined;

  switch (action.type) {
    case MarkdownList.ADD_MARKDOWN:
      const newItem = {
        id,
        ctime: action.date,
        mtime: action.date,
        title: action.title,
        content: action.content,
      };
      list[id] = newItem;
      return Object.assign({}, state, {
        seqId: id,
        selected: newItem,
        list,
      });
    case MarkdownList.DEL_MARKDOWN:
      if (list[action.id] === undefined) {
        return state;
      }
      delete list[action.id];

      return Object.assign({}, state, {
        list,
        selected,
      });
    case MarkdownList.UPDATE_MARKDOWN:
      if (list[action.id] === undefined) {
        return state;
      }
      const data = list[action.id];
      data.mtime = action.date;
      data.content = action.content;
      data.title = action.title;
      return Object.assign({}, state, {
        list,
      });
    case MarkdownList.SELECT_CURRENT_MARKDOWN:
      if (list[action.id] !== undefined) {
        selected = list[action.id];
        selected.id = action.id;
      }
      return Object.assign({}, state, {
        selected: Object.assign({}, selected),
      });
    case MarkdownList.UPDATE_CURRENT_MARKDOWN:
      const key = action.key;
      const value = action.value;
      selected = Object.assign({}, state.selected);
      selected[key] = value;
      return Object.assign({}, state, {
        selected,
      });
    default:
      return state;
  }
}
