import * as MarkdownList from '../constants/MarkdownList';

export function add(title, data) {
  return {
    type: MarkdownList.ADD_MARKDOWN,
    date: Date.now(),
    title,
    data,
  };
}

export function del(id) {
  return {
    type: MarkdownList.DEL_MARKDOWN,
    id,
  };
}

export function update(id, title, data) {
  return {
    type: MarkdownList.UPDATE_MARKDOWN,
    id,
    title,
    data,
  };
}
