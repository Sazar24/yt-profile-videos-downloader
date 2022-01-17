import { WebDriver } from "selenium-webdriver"
import { Clicker } from "../services/clicker.service"

export class CookiesWelcome {
    driver: WebDriver
    clicker: Clicker
    name: string = "CookiesWelcome-Page"

    constructor(driver: WebDriver) {
        this.driver = driver
        this.clicker = new Clicker(driver)
    }

    async acceptCookies() {
        const selector: string = "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > form > div > div > button > span"
        await this.clicker.clickAttempt(selector, `${this.name}: klikacz ciastek`)
    }
}