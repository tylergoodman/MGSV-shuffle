/// <reference path="../typings/tsd.d.ts" />

import * as app from 'app';
import * as BrowserWindow from 'browser-window';

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.setMenu(null);

  mainWindow.loadUrl(`file://${__dirname}/index.html`);

  // mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
