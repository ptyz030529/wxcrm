let Service = require('node-windows').Service

let svc = new Service({
  name: 'wxcrm', //服务名称
  description: 'wxcrm', //描述
  script: './index.js' 
})

svc.on('install', () => {
  svc.start()
})

svc.install()
