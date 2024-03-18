// main.js (Electron 主文件)

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let flaskApp;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 加载Flask服务的URL
  mainWindow.loadURL('http://localhost:5000/');
}

function startFlaskApp() {
  // 启动 Flask 应用
  flaskApp = spawn('python', ['path/to/your/flutter/app.py']);

  flaskApp.stdout.on('data', (data) => {
    console.log(`Flask stdout: ${data}`);
  });

  flaskApp.stderr.on('data', (data) => {
    console.error(`Flask stderr: ${data}`);
  });

  flaskApp.on('close', (code) => {
    console.log(`Flask app exited with code ${code}`);
  });
}

app.on('ready', () => {
  startFlaskApp(); // 启动 Flask
  createWindow();  // 创建 Electron 窗口
});

app.on('will-quit', () => {
  // 在 Electron 退出时终止 Flask 服务器
  flaskApp.kill();
});