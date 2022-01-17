import { VideoTileDTO } from './../models/videoTile.dto';
import { Builder, By, Key, until } from 'selenium-webdriver';
// import chrome = require("selenium-webdriver/chrome");
import * as chrome from 'selenium-webdriver/chrome'
import webdriver = require('selenium-webdriver');
import { DriverInitiator } from './services/driverInitiator';
import { CookiesWelcome } from './pages/cookiesWelcome.page';
import { scrollTillEnd } from './services/scroller.service';
import { VideosListPage } from './pages/videosListPage.page';
import { FileHandler_videoTiles } from './services/fileHandler.service';

// import webdriver = require('selenium-webdriver');

export class YtCrawler {
    driver: webdriver.WebDriver
    url: string = "https://www.youtube.com/c/MarekPurczy%C5%84ski/videos"

    cookiesWelcome: CookiesWelcome
    videosListPage: VideosListPage

    // constructor() { }

    async getLinksAsync(): Promise<VideoTileDTO[]> {
        try {
            console.log("selenium script has started!")
            const links: VideoTileDTO[] = await this.extractLinks()
            // const links: VideoTileDTO[] = await this.getVideosDataFromFile() // dev only
            console.log("Ilość linków: ", links.length)
            return links
        } catch (error) {
            console.error("dupło" + error)
        }
    }


    private async extractLinks(): Promise<VideoTileDTO[]> {
        await this.initDriver()
        this.initPagesModels()
        await this.driver.sleep(1000)

        await this.cookiesWelcome.acceptCookies()
        // await this.driver.findElement(By.css("#primary-items"))
        await this.videosListPage.confirmPageIsLoaded()
        await scrollTillEnd(this.driver)

        const result: VideoTileDTO[] = await this.getVideosDataFromPage()

        console.log("selenium script ended.")

        // await this.driver.sleep(5000)
        await this.driver.quit();
        return result
    }

    private async initDriver() {
        this.driver = await new DriverInitiator().getDriver()
        await this.driver.get(this.url)
    }

    private initPagesModels() {
        this.cookiesWelcome = new CookiesWelcome(this.driver)
        this.videosListPage = new VideosListPage(this.driver)
    }

    private async getVideosDataFromPage(): Promise<VideoTileDTO[]> {
        const allVideosTiles: VideoTileDTO[] = await this.videosListPage.getAllVideosTiles()
        new FileHandler_videoTiles().saveToFile(allVideosTiles)
        return allVideosTiles
    }

    private async getVideosDataFromFile(): Promise<VideoTileDTO[]> {
        const allVideosTiles: VideoTileDTO[] = await new FileHandler_videoTiles().readFromFile()
        // console.log("File content extracted:", allVideosTiles)
        return allVideosTiles

    }

}
