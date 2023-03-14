import cheerio from 'cheerio';
import https from 'https';
import fs from 'fs';
import crypto from 'crypto';

export default new class Function {

    downloadFile = (name, url) => {
        const file = fs.createWriteStream(`./tmp/${name}`);
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


    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    rand = (length) => {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return required number of characters
    }

    clearF = (folderPath) => {
        try {
            fs.readdir(folderPath, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    fs.unlink(`${folderPath}${file}`, (err) => {
                        if (err) throw err;
                        console.log(`Deleted ${file}`);
                    });
                }
            });
        
    } catch (error) {
        console.error('Error clearing folder', error);
    }
  }
}
