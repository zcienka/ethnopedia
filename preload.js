const { contextBridge } = require("electron")
const os = require("os")

contextBridge.exposeInMainWorld("electron", {
    homeDir: () => os.homedir(),
})

contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, data) => window.ipcRenderer.send(channel, data),
    on: (channel, func) => window.ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
