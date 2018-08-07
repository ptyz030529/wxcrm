const express = require('express');
const fs = require('fs');
const multer=require('multer');

const command = require('./src/command');
const log = require('./src/log');

const app = express();
const upload = multer({dest:'upload/'});


app.use(log());

app.get('/erp/:number', function(req, res){
  console.log(req.connection.remoteAddress.match(/\d+\.\d+\.\d+\.\d+/)[0]);
  console.log(req.params.number);
});

app.get('/call/:ip/:number', function(req, res){
  const {ip, number} = req.params;
  command.callPhone(ip.replace(/\-/g, '.'), number).then(function(result){
    if(result){
      res.json({
        code: 1,
        msg: '正在呼叫'+number
      });
    }else{
      res.json({
        code: -1,
        msg: '连接手机失败'
      });
    }
  });
});

app.post('/upload/:tel', upload.single('audio'), function(req, res){
  const file = req.file;
  const dirPath = `./upload/${req.params.tel}`;
  fs.exists(dirPath, function(isExists){
    if(!isExists){
      fs.mkdirSync(dirPath);
    }
    fs.renameSync(file.path,`${dirPath}/${file.originalname}`);
    res.json({
      code: 1,
      msg: '上传成功'
    });
  });
});

app.listen(3111);