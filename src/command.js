const adbClient = require('adbkit').createClient();


module.exports  = {
  async callPhone(ip, number){
    const id = await adbClient.connect(ip, '8888');
    if(id){ 
      setTimeout(
        function(){
          adbClient.shell(id, `am start -a android.intent.action.CALL tel:${number}`);
        }
      ,500)
      return true;
    }else{
      return false;
    }
  }
};