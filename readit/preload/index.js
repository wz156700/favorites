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

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    openAlert,
    openNewWindow
})