const adbClient = require('adbkit').createClient();

// adbClient.connect('192.168.2.109', '8888').then(function(id) {
//   adbClient.listDevices()
//   .then(function(devices) {
//     console.log(devices)
//   })
// })

module.exports  = {
  async callPhone(ip, number){
    const id = await adbClient.connect(ip, '8888');
    if(id){
      return adbClient.shell(id, `am start -a android.intent.action.CALL tel:${number}`);
    }else{
      return false
    }
  }
};