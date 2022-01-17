import { Page } from "puppeteer";
import { clickAttempt } from "../services/actions/clicker";

export class CookiesWelcome {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async acceptCookies() {
        const selector: string = "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > form > div > div > button > span"
        await clickAttempt(selector, this.page, "klikacz ciastek")
    }
}