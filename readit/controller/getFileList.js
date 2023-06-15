const { ipcMain } = require("electron")
const path = require('path')
const { readdir } = require('fs/promises') //node读取一个目录下所有的文件和子目录
ipcMain.handle('get-fileList-event', async (e) => {
    const files = await readdir(path.resolve(__dirname, '../public/upload/'))
    return files;
})