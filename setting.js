/*
/*************************
* Pake tinggal make
* jangan hapus sumbernya
**************************
* Github: amiruldev20
* Wa: 085157489446
*/

import syntaxerror from "syntax-error";
import Function from "./system/lib/function.js";

//-- global setting
global.set = {
  owner: ["6285157489446", "62851550602790"],
  func: Function,
  opt: {
    pathCommand: "cmd",
  },
  reloadFile: (path) => reloadFile(path),
};

//-- import module
import { fileURLToPath } from "url";
import fs from "fs";
import * as mywajs from "mywajs";
import qrcode from "qrcode-terminal";
import { chromium } from "playwright-chromium";
import path from "path";
import chalk from "chalk";
import os from "os";
import { exec } from "child_process";
//-- export
export { fileURLToPath, fs, mywajs, qrcode, chromium, path, chalk, os, exec };

//-- sistem reload
async function reloadFile(file) {
  let fileP = fileURLToPath(file);
  fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP);
    console.log(chalk.green(`[ UPDATE ] file => "${fileP}"`));
    import(`${file}?update=${Date.now()}`);
  });
}

//-- reload file
reloadFile(import.meta.url);
