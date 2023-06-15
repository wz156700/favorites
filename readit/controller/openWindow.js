const { ipcMain, BrowserWindow } = require("electron");
const path = require("path")
const save = require('./save')
const windowStateKeeper = require("electron-win-state").default;
const cssText = `bottom: 50px;right: 50px;position:fixed;z-index:1000;width:100px;height:30px;background-color: cornflowerblue;border-radius: 5px;text-align :center;line-height:30px;cursor:pointer;color:#fff;`
let code = `const div =document.createElement('div')
div.id = 'readit-button'
div.innerHTML = '关闭窗口'
div.addEventListener('click',()=>{myWindowApi.closeWindow()})
div.style.cssText = '${cssText}'
document.body.appendChild(div)`

let win;
// 创建窗口
const createWindow = (url) => {
    const winstate = new windowStateKeeper({
        defaultWidth: 1200,
        defaultHeight: 800,
        dev: true,
        // 解决窗口之间相互干扰问题
        electronStoreOptions: {
            name: 'window-state-open'
        }
    });

    win = new BrowserWindow({
        ...winstate.winOptions,
        webPreferences: {
            preload: path.join(__dirname, '../preload/open.js'), // 引入预处理文件
        },
    });

    win.loadURL(url);

    winstate.manage(win);

    // 优雅的打开窗口
    win.once('ready-to-show', () => {
        win.show()
        win.webContents.executeJavaScript(code).then(() => { }).catch((e) => { })
    })

    win.webContents.on('context-menu', (e, args) => {
        if (args.srcURL) {
            save(args.srcURL, win)
        }

    })

};

//接收url,打开窗口，显示url内容
ipcMain.handle('open-window-event', async (e, url) => {
    createWindow(url);
})

//关闭窗口事件
ipcMain.handle('close-window-event', async (e) => {
    win.close();
})