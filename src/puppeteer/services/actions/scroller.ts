import { Page } from "puppeteer"
import { clickAttempt } from "./clicker";
import { sleep } from "./sleep";

let scrollsCounter: number = 0;
let keyScrollsCounter: number = 0;


export async function scrollPageDownOnce(page: Page, y: number = 1500) {
    try {
        await page.evaluate((y) => window.scrollBy(0, y))
        await page.screenshot({ path: `result/scroll-${scrollsCounter}.png` })
        scrollsCounter++
        console.log("Scrollowanie udane.  nr: ", scrollsCounter)

    } catch (error) {
        console.error("Scroll'nięcie nieudane. ")
        throw error
    }
}

export async function scrollXTimesBy(page: Page, n: number, y: number = 5000) {
    for (let i = 0; i <= n; i++) {
        i++
        console.log(`Scrolowanie ${i} z ${n}`)
        await scrollPageDownOnce(page, y)
    }
}

export async function scrollByKeyEmit(page: Page, shouldScreenshot: boolean = false) {
    await page.keyboard.press("End")
    await page.keyboard.up("End")
    await page.screenshot({ path: `result/scroll-${keyScrollsCounter}-key.png` })
    keyScrollsCounter++

}

export async function scrollTillEnd(page: Page) {
    let shouldContinue: boolean = true
    let height: number

    while (shouldContinue) {
        // while (true) {
        let heightBeforeScrolls: number = await getHeight(page)

        await scrollByKeyEmit(page, true)
        await sleep(1000, true)

        height = await getHeight(page)
        heightBeforeScrolls === height ? shouldContinue = false : null
        console.log({ heightBeforeScrolls, height, shouldContinue })
    }
}

const getHeight = async (page: Page) => await page.evaluate(() => document.documentElement.scrollHeight)
                            // height = await page.evaluate(() => document.documentElement.offsetHeight);