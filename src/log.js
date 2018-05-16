const fileStreamRotator = require('file-stream-rotator');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = fileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

module.exports = function(){
  return morgan('combined', {stream: accessLogStream})
}