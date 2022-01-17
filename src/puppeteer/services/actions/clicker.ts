import { Page } from "puppeteer";

export async function clickAttempt(selector: string, page: Page, description: string) {
    try {
        const element = (await page.$(selector)).asElement()
        await element.click()
        console.log(`Kliknięto element: ${description}.`)

    } catch (error) {
        console.error(`Nieudane kliknięcie elementu "${description}".`)
        console.error(`Robię screena elementu "${description}".`)
        await page.screenshot({ path: `result/error.png`, fullPage: true });
        throw error
    }

}