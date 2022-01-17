import { VideoTileDTO } from './models/videoTile.dto';
import { YtCrawler } from './selenium/crawler';
import { VideoDownloader } from './selenium/services/videoDownloader.service';

export class App {
    private videoDownloader = new VideoDownloader()
    private linksExtractor = new YtCrawler()

    async run() {
        console.log("App has started")

        const links: VideoTileDTO[] = await this.linksExtractor.getLinksAsync()
        await this.videoDownloader.downloadVideos(links)


        console.log("App has ended.")
    }
}
