const { Menu, dialog, ipcMain } = require("electron"); //Menu创建原生菜单喝上下文菜单,dialog 模块提供了api来展示原生的系统对话框
const path = require('path');
//避免文件名重复,引入第三方库设置文件名
const randomstring = require("randomstring");
//保存时需要知道图片类型，需要引入第三方库
const imageType = require('image-type')

//需要根据url得到文件内容，使用got
const got = require("got").default;

//引入node文件模块
const { writeFile } = require('fs')

const { readdir } = require('fs/promises') //node读取一个目录下所有的文件和子目录

//建立与渲染进程的通信通道
let event = null
ipcMain.on('on-filelist-event', (e, args) => {
    event = e;
    // 由于主进程要做别的异步操作之后才向渲染进程发送消息，
    //所以先将对应的event暂存起来，等到对应的异步事件处理完毕之后再返回数据给渲染进程
})

const save = (srcURL) => {


    const template = [{
        label: '图片另存为.....',
        click: async () => {
            //根据url得到文件内容
            let content = await got.get(srcURL);
            //将文件内容转成二进制
            let bufferContent = Buffer.from(content.rawBody)

            // 创建文件名字随机数
            let imgNameRandom = randomstring.generate(10);
            //判断图片类型
            let { ext } = imageType(bufferContent)

            //组装文件类型
            let fileName = imgNameRandom + '.' + ext
            const { canceled, filePath } = await dialog.showSaveDialog({
                title: '图片另存为',
                defaultPath: path.join(__dirname, `../public/upload/${fileName}`)
            })

            // 如果被保存了，将文件内容写入
            if (!canceled) {
                writeFile(filePath, bufferContent, async () => {
                    event.sender.send('message-from-main', 'change') // 图片保存完毕之后，通知渲染进程
                });
            }
        }
    }]
    const menu = Menu.buildFromTemplate(template);
    menu.popup();
}

module.exports = save