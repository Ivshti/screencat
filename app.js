var path = require('path')
var menubar = require('menubar')
var ipc = require('ipc')
var Menu = require('menu')

var mb = menubar({
  width: 700,
  height: 300,
  index: 'file://' + path.join(__dirname, 'app.html'),
  icon: 'file://' + path.join(__dirname, 'img', 'Icon.png')
})

mb.on('ready', function ready () {
  console.log('ready')
})

ipc.on('terminate', function terminate (ev) {
  mb.app.terminate()
})

ipc.on('resize', function resize (ev, data) {
  mb.window.setSize(data.width, data.height)
})

var template = [{
  label: "Screencat", submenu: [] 
}, {
  label: 'Edit', 
  submenu: [
    { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' }, 
    { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' }, 
    { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' }, 
    { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' },
  ]
}];
Menu.setApplicationMenu(Menu.buildFromTemplate(template)); 