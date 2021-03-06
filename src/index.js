  const { app, BrowserWindow, dialog, Menu, shell  } = require('electron');
  const path = require('path');
  var pjson = require('../package.json');

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
  }

  const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  var menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
    {
      label:'More apps',
      click() {
        shell.openExternal('https://afonsolopez.com/')
      }
    },
    {
      label:'About',
      click() {
        dialog.showMessageBox({
          title: "About",
          buttons: ['Close'],
          type: 'none',
          message: "Beta Version: " + pjson.version + "\nDesigned and coded by me ✌🏾" + "\n© Copyright " + new Date().getFullYear() +  ", Afonso Lopez"
        })
      }
    },
    {
      label:'Exit', 
      click() { 
        app.quit() 
      } 
    }
    ]
  }
  ])
  Menu.setApplicationMenu(menu); 

};

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

  app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
