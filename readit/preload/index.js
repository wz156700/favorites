const { contextBridge, ipcRenderer, remote, shell } = require('electron');
// 添加网址
const sendUrl = async (url) => {
    const result = await ipcRenderer.invoke('get-url', url);
    return result;
}

// 打开提示框
const openAlert = async (msg) => {
    await ipcRenderer.invoke('alert', msg);
}

// 打开新的窗口
const openNewWindow = async (url) => {
    await ipcRenderer.invoke('open-window-event', url);
}

// 获取图片列表
const getFileList = async () => {
    let fileList = await ipcRenderer.invoke('get-fileList-event');
    return fileList
}

// 添加图片之后重新获取图片列表
const getFileListOnMain = (cb) => {
    ipcRenderer.send('on-filelist-event');// 先建立与主进程的通信通道
    // 主进程向渲染进程发送消息时接收的事件
    ipcRenderer.on('message-from-main', (e, data) => {
        cb()
    });
}

// 删除图片后重新获取图片列表
const deleteImg = (imgName, cb) => {
    ipcRenderer.invoke("on-delete-event", imgName)
    ipcRenderer.on('message-from-delete', (e, data) => {
        cb();
    });
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    openAlert,
    openNewWindow,
    getFileList,
    getFileListOnMain,
    deleteImg
})