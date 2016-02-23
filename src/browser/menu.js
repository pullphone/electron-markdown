import Menu from 'menu';
import App from 'app';

export function get(env, webContents) {
  const template = [
    {
      label: 'File',
      submenu: [
        {label: 'New', accelerator: 'CmdOrCtrl+N', click: () => {
          webContents.send('menu-action', 'new');
        }},
        {label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => {
          webContents.send('menu-action', 'save');
        }},
        {label: 'Delete', accelerator: 'CmdOrCtrl+Backspace', click: () => {
          webContents.send('menu-action', 'delete');
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
    {
      label: 'Navigation',
      submenu: [
        {label: 'Prev', accelerator: 'CmdOrCtrl+Shift+[', click: () => {
          webContents.send('menu-action', 'prev');
        }},
        {label: 'Next', accelerator: 'CmdOrCtrl+Shift+]', click: () => {
          webContents.send('menu-action', 'next');
        }},
      ]
    }
  ];

  if (env == 'development') {
    template.push({
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
    });
  }

  return Menu.buildFromTemplate(template);
}
