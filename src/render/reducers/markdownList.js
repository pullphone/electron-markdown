import * as MarkdownList from '../constants/MarkdownList';

const initialState = {
  seqId: 0,
  list: {},
};

export default function markdownList(state = initialState, action) {
  const list = Object.assign({} , state.list);
  const id = state.seqId + 1;

  switch (action.type) {
    case MarkdownList.ADD_MARKDOWN:
      list[id] = {
        ctime: action.date,
        mtime: action.date,
        title: action.title,
        data: action.data,
      }
      return Object.assign({}, state, {
        seqId: id,
        list,
      });
    case MarkdownList.DEL_MARKDOWN:
      if (list[action.id] === undefined) {
        return state;
      }
      delete list[action.id];
      return Object.assign({}, state, {
        list,
      });
    case MarkdownList.UPDATE_MARKDOWN:
      if (list[action.id] === undefined) {
        return state;
      }
      const data = list[action.id];
      data.mtime = action.date;
      data.data = action.data;
      data.title = action.title;
      return Object.assign({}, state, {
        list,
      });
    default:
      return state;
  }
}
