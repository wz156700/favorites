const { app, BrowserWindow } = require("electron");
const winState = require("electron-win-state").default;
const path = require("path");

const createWindow = () => {
    const winstate = new winState({
        defaultWidth: 1000,
        defaultHeight: 800,
    });

    const win = new BrowserWindow({
        ...winstate.winOptions,
        webPreferences: {
            preload: path.resolve(__dirname, "./preload/index.js"), // 引入预处理文件
        },
    });

    win.loadURL("http://127.0.0.1:5173/");
    win.webContents.openDevTools = true;

    winState.manage(win);
};

app.whenReady().then(() => {
    createWindow();

    //如果重新激活应用，没有窗口的话，重新创建一个窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    //检测窗口关闭
    app.on("window-all-closed", () => {
        //在mac系统下关闭窗口退出程序
        if (process.platform === "darwin") {
            app.quit();
        }
    });
});
