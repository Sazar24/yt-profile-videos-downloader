import * as fs from "fs-extra"
// import * as ytdl from 'ytdl-core';
import ytdl = require('ytdl-core');
import { Readable } from 'stream';

// const fs = require('fs');
// const ytdl = require('ytdl-core');
// // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// // TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
//   .pipe(fs.createWriteStream('video.mp4'));



export class YtDownloader {
    async run(): Promise<void> {

        // await ytdl
        console.log("start")
        // const url = "https://www.youtube.com/watch?v=ObjbUJ3ULhg&ab_channel=MarekPurczy%C5%84ski"
        // const url = "https://www.youtube.com/watch?v=56igHUi_OvY&ab_channel=FILMFORYOU" // long, 1h+
        const url = "https://www.youtube.com/watch?v=i87YsywM93o&ab_channel=MarekPurczy%C5%84ski" // short
        // ytdl(url).pipe(fs.createWriteStream('result/video4.mp4'));
        // ytdl(url).pipe(fs.createWriteStream('result/video4.mp4')).on("end",()=>console.log("done"))
        console.log("done?")

        return
    }

    async runAsync(): Promise<void> {
        const url = "https://www.youtube.com/watch?v=56igHUi_OvY&ab_channel=FILMFORYOU"

        return new Promise((resolve, reject) => {
            const downloadStream: Readable = ytdl(url)
            downloadStream
                .pipe(fs.createWriteStream('result/video9.mp4'))
                .on("finish", () => {
                    console.log("finished!")
                    resolve()
                })
                // .on("drain", () => {
                //     console.log("draining!")
                //     TODO: tu można zrobić monitorowanie wielkości pliku ( .on("progress",...) nie działa.  )
                // })
                .on("error", (err) => {
                    console.warn("download crashed!")
                    reject(err)
                })
        });

        // downloadStream.pipe(fs.createWriteStream("result/video5.mp4")).on("end", )
        // .pipe(fs.createWriteStream('result/video4.mp4'));

    }

    private async excecuteDownload(url: string): Promise<void> {
        /* To może i trochę pojebane, ale funkcja zdaje się nie zwracać Promise'a, ale i tak wspiera await'a? Tutaj to potwierdzam */

        let isDone: boolean = false

        ytdl(url).pipe(fs.createWriteStream('result/video3.mp4'));
        // isDone = true

        return
    }

}