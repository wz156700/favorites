const { contextBridge, ipcRenderer, remote, shell } = require('electron');
const sendUrl = async (url) => {
    const result = await ipcRenderer.invoke('get-url', url);
    return result;
}

const openAlert = async (msg) => {
    console.log(msg)
    await ipcRenderer.invoke('alert', msg);
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    openAlert
})