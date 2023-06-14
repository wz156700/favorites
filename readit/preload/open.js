const { contextBridge, ipcRenderer, } = require('electron');
const closeWindow = () => {
    ipcRenderer.invoke('close-window-event');
}

contextBridge.exposeInMainWorld('myWindowApi', {
    closeWindow
})