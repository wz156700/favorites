const { contextBridge, ipcRenderer, } = require('electron');
const closeWindow = () => {
    ipcRenderer.invoke('close-window-event');
}
const getFileListOnMain = () => {
    ipcRenderer.on('message-from-main', (e, data) => {
        console.log(data)
    });
}

contextBridge.exposeInMainWorld('myWindowApi', {
    closeWindow
})