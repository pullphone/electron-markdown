import * as MarkdownList from '../constants/MarkdownList';

export function add(title, content) {
  return {
    type: MarkdownList.ADD_MARKDOWN,
    date: new Date(),
    title,
    content,
  };
}

export function del(id) {
  return {
    type: MarkdownList.DEL_MARKDOWN,
    id,
  };
}

export function update(id, title, content) {
  return {
    type: MarkdownList.UPDATE_MARKDOWN,
    date: new Date(),
    id,
    title,
    content,
  };
}

export function select(id) {
  return {
    type: MarkdownList.SELECT_CURRENT_MARKDOWN,
    id,
  };
}

export function updateSelected(key, value) {
  return {
    type: MarkdownList.UPDATE_CURRENT_MARKDOWN,
    key,
    value,
  };
}
