import { WebDriver } from 'selenium-webdriver';

export async function scrollTillEnd(driver: WebDriver): Promise<void> {

    const scrollDownTillEnd = async () => {
        let counter = 0
        let heightBefore = 0
        let heightAfter = 0
        let shouldContinue = true

        const scrollDown = () => window.scrollBy(0, document.body.scrollHeight || document.documentElement.scrollHeight)
        const scrollAndCalc = async () => {
            heightBefore = document.body.scrollHeight || document.documentElement.scrollHeight
            scrollDown()
            await new Promise((res) => setTimeout(() => res(null), 2000)) // sleep
            heightAfter = document.body.scrollHeight || document.documentElement.scrollHeight
            shouldContinue = heightAfter != heightBefore
            counter++
            console.log({ shouldContinue, heightBefore, heightAfter, counter })
        }

        while (shouldContinue) {
            await scrollAndCalc()
        }
    }

    await driver.executeScript(scrollDownTillEnd)
    console.log("Skończyłem scrollowanie strony.")
}