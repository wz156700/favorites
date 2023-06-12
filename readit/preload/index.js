const { contextBridge, ipcRenderer, remote, shell } = require('electron');
const sendUrl = async (url) => {
    const result = await ipcRenderer.invoke('get-url', url);
    console.log(result);
    return result;
}

const openAlert = async (msg) => {
    await ipcRenderer.invoke('alert', msg);
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    openAlert
})