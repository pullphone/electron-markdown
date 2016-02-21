import App from 'app';
import BrowserWindow from 'browser-window';
var mainWindow = null;

App.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

App.on('ready', function() {
  mainWindow = new BrowserWindow({width: 798, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
