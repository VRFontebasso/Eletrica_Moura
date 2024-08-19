const { app, BrowserWindow, screen } = require('electron');

function carregar_janela() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const janela = new BrowserWindow({
        width: 1100,
        height: 900,
        frame:false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    janela.loadFile('index.html');
}

app.whenReady().then(carregar_janela);
