const { ipcMain, BrowserWindow } = require("electron");

//接收url,返回url对应的网站截图
ipcMain.handle('get-url', async (e, url) => {
    try {
        let result = await getSource(url)
        return result
    } catch (error) {
        console.log(error)
    }

})

// 获取网站资源
const getSource = (url) => {
    return new Promise((resolve, reject) => {
        //打开一个不显示的窗口
        let win = new BrowserWindow({
            width: 500,
            height: 500,
            show: false, // 默认不显示
            webPreferences: {
                offscreen: true, //是否绘制和渲染可视区域外的窗口.
            }
        })

        win.loadURL(url); // 加载网站

        win.webContents.on('did-finish-load', async () => {
            try {
                const title = win.getTitle(); // 获取窗口名字
                const image = await win.webContents.capturePage() // 获取窗口截图
                console.log(image.isEmpty());
                if (image.isEmpty()) {
                    resolve({ msg: '网址有误,无法获取网页信息，请核对' })
                }
                else {
                    const imageUrl = image.toDataURL(); // 获取截图的base64图片
                    resolve({ title, url, imageUrl }) // 返回网站的图片，标题
                }

            } catch (error) {
                reject(error)
            }

        })
    })
}