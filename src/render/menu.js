import electron from 'electron';

import * as MarkdownActions from './actions/Markdown';

const remote = electron.remote;
const Menu = remote.Menu;
const processName = remote.app.getName();

export default function createMenu(store) {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {label: 'New', accelerator: 'CmdOrCtrl+N', click: () => {
          store.dispatch(MarkdownActions.add('new', 'new content'));
        }},
        {label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => {
          const selected = store.getState().markdownList.selected;
          store.dispatch(MarkdownActions.update(selected.id, selected.title, selected.content));
        }},
        {type: 'separator'},
        {label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => {
          remote.app.quit();
        }},
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: 'Debug',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
              return 'Ctrl+Command+F';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
              return 'Alt+Command+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
      ]
    },
  ]);
  Menu.setApplicationMenu(menu);
}
