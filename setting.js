import func from "./system/lib/func.js"

import * as mywajs from 'mywajs'
import qrcode from 'qrcode-terminal'
import chalk from 'chalk'
import moment from 'moment-timezone'
import fs from "node:fs"
import {
    spawn
} from 'node:child_process'
import {
    exec
} from 'node:child_process'
import path from 'node:path'
import {
    fileURLToPath
} from 'node:url'
import os from 'node:os'
import util from 'util'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -- setting global
global.npm = {
    mywajs: mywajs,
    qrcode: qrcode,
    chalk: chalk,
    moment: moment,
    fs: fs,
    spawn: spawn,
    exec: exec,
    path: path,
    fileURLToPath: fileURLToPath,
    os: os,
    util: util
}

global.reloadFile = (file) => reloadFile(file)

// MY SET GLOBAL
global.set = {
    getses: async (folder) => {
        var get = await getSes(folder)
        return bytes(get)
    },
    mywa: {},
    owner: ["62851574894460"],
    ses: {
        path: '.mywajs_auth',
        name: 'session'
    },
    opt: {
        public: false,
        antiCall: false,
        prefix: "#",
        URI: "mongodb+srv://wweb:mywa1337@cluster0.aybyqhr.mongodb.net/?retryWrites=true&w=majority",
    },
    func: func,
    //  scrape: scrape,
    // limit
    limit: {
        free: 25,
        premium: 250,
        VIP: "Infinity",
        download: {
            free: 42300000, // use byte
            premium: 423000000, // use byte
            VIP: 1130000000, // use byte 
        }
    },

}


function reloadFile(file) {
    file = (file).url || (file)
    let fileP = fileURLToPath(file)
    fs.watchFile(fileP, () => {
        fs.unwatchFile(fileP)
        console.log(`Update File "${fileP}"`)
        import(`${file}?update=${Date.now()}`)
    })
}

reloadFile(import.meta.url)