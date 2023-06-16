const { ipcMain } = require("electron")
const path = require('path')
const { readdir } = require('fs/promises') //node读取一个目录下所有的文件和子目录
const fs = require('fs');
const { unlink } = require('fs/promises');

const checkFileExists = (dir, filename) => {
    const filePath = path.join(dir, filename); // 获取文件的完整路径
    try {
        fs.accessSync(filePath, fs.constants.F_OK); // 检查文件是否存在
        return { fillPath: filePath, isFile: true };
    } catch (err) {
        return { fillPath: filePath, isFile: false };
    }
}

ipcMain.handle('get-fileList-event', async (e) => {
    const files = await readdir(path.resolve(__dirname, '../public/upload/'))
    return files;
})

ipcMain.handle("on-delete-event", (e, filename) => {
    // 判断文件是否存在
    let { fillPath, isFile } = checkFileExists(__dirname, `../public/upload/${filename}`)

    // 如果文件存在，删除文件之后，通知渲染进程重新获取图片列表
    if (isFile) {
        unlink(fillPath).then(() => {
            e.sender.send('message-from-delete', true) // 图片保存完毕之后，通知渲染进程
        }).catch((e) => {
            throw new Error(e)
        })
    }
})

