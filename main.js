const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const { remote } = require("electron")
const { ipcMain } = require("electron/main")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            sandbox: false,
        },
    })
    win.webContents.openDevTools()

    const startUrl = url.format({
        pathname: path.join(__dirname, "./build/index.html"),
        protocol: "file",
    })

    win.loadURL("http://localhost:3000")
}

app.whenReady().then(createWindow)

ipcMain.on("submit:metadataForm", async (e, opt) => {
    console.log(opt.data)
})
