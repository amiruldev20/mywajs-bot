exports.downloadFile = (url, name) => {
    const https = require('https');
const fs = require('fs');
  const file = fs.createWriteStream(`./tmp/${name}.mp4`);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log(`Downloaded file: ${name}`);
      });
    });
  }).on('error', error => {
    console.error(`Error downloading file: ${error}`);
  });
}

exports.delay = (ms)  => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.rand = (length) => {
    const crypto = require('crypto');
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') // convert to hexadecimal format
          .slice(0,length); // return required number of characters
}
