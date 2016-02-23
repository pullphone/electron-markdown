import App from 'app';
import BrowserWindow from 'browser-window';
import Menu from 'menu';

var mainWindow = null;
var webContents = null;

App.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

App.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    center: true,
  });
  webContents = mainWindow.webContents;
  var menuItems = require('./menu');
  Menu.setApplicationMenu(menuItems.get(process.env.ENVIRONMENT, webContents));
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
