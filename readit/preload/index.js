const { contextBridge, ipcRenderer, remote, shell } = require('electron');
const sendUrl = async (url) => {
    const result = await ipcRenderer.invoke('get-url', url);
    console.log(result);
    return result;
}

const openAlert = async (msg) => {
    await ipcRenderer.invoke('alert', msg);
}

const openNewWindow = async (url) => {
    await ipcRenderer.invoke('open-window-event', url);
}

const getFileList = async () => {
    let fileList = await ipcRenderer.invoke('get-fileList-event');
    return fileList
}

const getFileListOnMain = async () => {
    ipcRenderer.on('message-from-main', (e, data) => {
        console.log(data)
    });
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    openAlert,
    openNewWindow,
    getFileList,
    getFileListOnMain
})