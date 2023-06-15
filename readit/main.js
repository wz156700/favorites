const { app, BrowserWindow } = require("electron");
const winState = require("electron-win-state").default;
const path = require("path");
require("./controller/getSource.js")
require("./controller/alert.js")
require("./controller/openWindow.js")
require("./controller/getFileList.js")



const createWindow = () => {
    const winstate = new winState({
        defaultWidth: 1000,
        defaultHeight: 800,
        // 解决窗口之间相互干扰问题
        electronStoreOptions: {
            name: 'window-state-main'
        }
    });

    const win = new BrowserWindow({
        ...winstate.winOptions,
        webPreferences: {
            preload: path.join(__dirname, './preload/index.js'), // 引入预处理文件
        },
    });

    win.loadURL("http://127.0.0.1:5173/");
    // win.webContents.openDevTools = true;
    winstate.manage(win);

    // 优雅的打开窗口
    win.once('ready-to-show', () => {
        win.show()
    })
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


