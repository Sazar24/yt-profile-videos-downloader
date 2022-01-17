import { VideoTileDTO } from './../../models/videoTile.dto';
import { By, WebDriver, WebElement } from "selenium-webdriver"
import { Clicker } from "../services/clicker.service"
import { sleep } from './../../../src/puppeteer/services/actions/sleep';
// import { sleep } from 'src/puppeteer/services/actions/sleep';

export class VideosListPage {
    driver: WebDriver
    clicker: Clicker
    name: string = "VideosList-Page"
    allTiles: VideoTileDTO[] = []

    constructor(driver: WebDriver) {
        this.driver = driver
        this.clicker = new Clicker(driver)
    }

    async confirmPageIsLoaded(): Promise<void> {
        await this.driver.findElement(By.css("#primary-items"))
    }

    async getAllVideosTiles(): Promise<VideoTileDTO[]> {
        const selector_xpath: string = '//*[@id="video-title"]'
        const elements: WebElement[] = await this.driver.findElements(By.xpath(selector_xpath))

        await Promise.all(elements.map(async (el) => {
            const videoTileDTO: VideoTileDTO = await VideoTileDTO.createNew(el)
            // console.log(videoTileDTO.title)
            // await sleep(1)
            this.allTiles.push(videoTileDTO)
        }))
        if (!this.allTiles.length) {
            throw Error("Brak danych klipów wideo.")
        }

        // this.allTiles.map(t => console.log(t))
        return this.allTiles
    }
}