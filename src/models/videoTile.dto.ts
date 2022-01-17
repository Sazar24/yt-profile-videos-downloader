import { WebElement } from 'selenium-webdriver';

export class VideoTileDTO {
    webElement: WebElement
    href: string
    title: string


    static async createNew(webElement: WebElement): Promise<VideoTileDTO> {
        const self: VideoTileDTO = new VideoTileDTO()
        await self.parseWebElement(webElement)
        return self
    }

    private async parseWebElement(webElement: WebElement) {
        try {
            this.href = await webElement.getAttribute("href")
            this.title = await webElement.getAttribute("innerText")

        } catch (error) {
            console.error("!! Element parsing failed.", error)
        }
    }

    


}