import * as fs from 'fs-extra';
// import * as jsdom from "jsdom";
import { VideoTileDTO } from './../../models/videoTile.dto';


export class FileHandler_videoTiles {
    path: string = "result/data/videosData.txt"

    async saveToFile(data: VideoTileDTO[]): Promise<void> {
        try {
            console.log(`Rozpoczynam zapis do pliku: '${this.path}'.`)
            // fs.writeFileSync(this.path, JSON.stringify(data))
            await fs.writeFile(this.path, JSON.stringify(data))
            console.log('Udany zapis do pliku.')
        } catch (error) {
            console.error("!! Zapis do pliku nieudany" + error)
        }
    }

    async readFromFile(): Promise<VideoTileDTO[]> {
        const fileContent: string = await fs.readFile(this.path, "utf-8")
        try {
            const parsedData: VideoTileDTO[] = JSON.parse(fileContent)
            const result: VideoTileDTO[] = []

            parsedData.map(( obj: VideoTileDTO ) => {
                const videoData: VideoTileDTO = new VideoTileDTO()
                videoData.href = obj.href
                videoData.title = obj.title
                result.push(videoData)
            })
            return result
        } catch (error) {
            console.error("!! Błąd podczas parsowania danych z pliku.", error)
        }



        return []
    }
}