const { ipcMain, dialog } = require("electron");

//接收url,返回url对应的网站截图
ipcMain.handle('alert', async (e, msg) => {
    console.log(msg)
    let result = await dialog.showMessageBoxSync({
        message: msg,
        type: 'info'
    })
    return result;
})