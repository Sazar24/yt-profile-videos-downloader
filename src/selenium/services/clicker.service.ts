import { Builder, By, Key, until } from 'selenium-webdriver';
import { WebDriver } from "selenium-webdriver"


export class Clicker {
    driver: WebDriver
    constructor(driver: WebDriver) {
        this.driver = driver
    }

    async clickAttempt(cssSelector: string, description: string, silent: boolean = true) {
        try {
            const element = (await this.driver.findElement(By.css(cssSelector)))
            await element.click()
            if (!silent) {
                console.log(`Kliknięto element: ${description}.`)
            }
        } catch (error) {
            console.error(`Nieudane kliknięcie elementu "${description}".`)
            // console.error(`Robię screena elementu "${description}".`)
            // await driver.screenshot({ path: `result/error.png`, fullPage: true });
            throw error
        }
    }
}