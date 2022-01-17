import * as fs from "fs-extra";
import { Readable } from 'stream';
import { VideoTileDTO } from './../../models/videoTile.dto';
import sanitize = require("sanitize-filename");
import ytdl = require('ytdl-core');
// import * as sanitize from "sanitize-filename";

export class VideoDownloader {
    // urlBase: string = "https://www.youtube.com/"
    errorsCounter: number = 0
    successCounter: number = 0

    async downloadVideos(links: VideoTileDTO[]): Promise<void> {
        console.log("Rozpoczynam pobieranie video.")
        // await Promise.all(links.map(
        //     async (link: VideoTileDTO) => {
        //         const url: string = link.href
        //         const fileName: string = this.adjustFileName(link.title)
        //         await this.attemptToDownload(url, fileName)
        //     })
        // )
        let handledUrls: number = 0
        const maxtodo: number = links.length

        while (handledUrls < maxtodo) {
            console.log(`Video: ${handledUrls} / ${maxtodo}`)

            const link: VideoTileDTO = links[handledUrls]

            const url: string = link.href
            const fileName: string = this.adjustFileName(link.title)
            await this.attemptToDownload(url, fileName)
            handledUrls++
            console.log("Handled: ", fileName, "   | handled-so-far: ", handledUrls, "\n")
        }
        console.log(`Zakończono pobieranie. Ilość błędów: ${this.errorsCounter}.\nIlość pobranych video: ${this.successCounter}.`)
    }

    private adjustFileName(title: string): string {
        const result: string = sanitize(title)
        console.log("FileNameAdjusted:   ", result)
        return result
    }

    private async attemptToDownload(url: string, title: string): Promise<void> {
        try {
            await this.downloadSingleVideo(url, title)
            this.successCounter++
        } catch (error) {
            this.errorsCounter++
            console.log("!! Downloading failed!", error)
        }
    }

    private async downloadSingleVideo(url: string, title: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const downloadStream: Readable = ytdl(url)
            const path: string = `result/data/video/${title}.mp4`

            downloadStream
                .pipe(fs.createWriteStream(path))
                .on("finish", () => {
                    console.log(`finished! fileName: "${title}".`)
                    resolve(null)
                })
                // .on("drain", () => {
                //     console.log("draining!")
                //     TODO: tu można zrobić monitorowanie wielkości pliku ( .on("progress",...) nie działa.  )
                // })
                .on("error", (err) => {
                    console.warn(`download crashed! fileName: ${title}.`)
                    reject(err)
                })
        });
    }

}