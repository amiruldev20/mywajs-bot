/*
/*************************
* Pake tinggal make
* jangan hapus sumbernya
**************************
* Github: amiruldev20
* Wa: 085157489446
*/
import fs from "fs";
import stable from "json-stable-stringify";

export class Localdb {
  constructor(db) {
    this.file = db || "mywadb";
  }

  fetch = async () => {
    if (!fs.existsSync(`./${this.file}.json`)) return {};
    const json = JSON.parse(fs.readFileSync(`./${this.file}.json`, "utf-8"));
    return json;
  };

  save = async (data) => {
    const database = data ? data : global.db;
    fs.writeFileSync(`./${this.file}.json`, stable(database));
    fs.writeFileSync(`./temp/${this.file}.bak`, stable(database));
  };
}
