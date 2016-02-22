import Menu from 'menu';
import App from 'app';

export function get(webContents) {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {label: 'New', accelerator: 'CmdOrCtrl+N', click: () => {
          webContents.send('menu-action', 'new');
        }},
        {label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => {
          webContents.send('menu-action', 'save');
        }},
        {type: 'separator'},
        {label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => {
          App.quit();
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
  ]);
}
