import * as puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import { CookiesWelcome } from '../pages/cookiesWelcome.page';
import { scrollByKeyEmit, scrollPageDownOnce, scrollTillEnd } from './actions/scroller';
import { sleep } from './actions/sleep';
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

export class VideosLinksExtractor_viaPupppeteer {
    browser: puppeteer.Browser

    async runAsync() {
        return this.extractLinks()
    }
    async extractLinks(): Promise<string[]> {
        return await this.startScrapping()
    }

    private async startScrapping(): Promise<string[]> {
        let errorScreenPage: Page
        try {
            await this.initAll()
            const page: Page = await this.browser.newPage();
            errorScreenPage = page

            // const url: string = "https://www.youtube.com/watch?v=i87YsywM93o"
            const url: string = "https://www.youtube.com/c/MarekPurczy%C5%84ski/videos"

            await this.loadPageAndScrollItToTheEnd(page, url)
            await this.findMainDivEndExtractLinks(page)


            // await sleep(40*1000)
            await this.browser.close();

            return []

        } catch (error) {
            console.error("Something fuck*d up!", error)
            await errorScreenPage.screenshot({ path: `result/error-final.png`, fullPage: false });
        }
    }

    private async initAll(): Promise<void> {
        this.browser = await puppeteer.launch({
            product: "chrome",
            waitForInitialPage: true,
            headless: false,
            defaultViewport: { width: 1800, height: 1000 },
            args: [`--window-size=${1800},${1000}`]
        });

    }

    private async loadPageAndScrollItToTheEnd(page: Page, url: string): Promise<void> {
        await page.goto(url);
        await sleep(500)
        const width = await page.evaluate(() => document.documentElement.offsetWidth);
        console.log({ width })
        const cookiesPage = new CookiesWelcome(page)
        await cookiesPage.acceptCookies()
        // await sleep(1000)
        // await page.goto(url);
        await page.waitForSelector("#primary-items")
        // await sleep(1000)
        console.log("--------------------")
        // let height = await page.evaluate(() => document.documentElement.scrollHeight);
        // console.log("wysokość strony: ", height)
        // height = await page.evaluate(() => document.documentElement.offsetHeight);
        // console.log("wysokość strony1: ", height)

        // await scrollByKeyEmit(page)
        // await scrollTillEnd(page)

        // let height2 = await page.evaluate(() => document.documentElement.offsetHeight);
        // console.log("wysokość strony2: ", height2)

        // height = await page.evaluate(() => document.documentElement.scrollHeight);
        // console.log("wysokość strony3: ", height)
        // await page.screenshot({ path: `result/final.png`, fullPage: false });
    }

    private async findMainDivEndExtractLinks(page: Page) {
        try {
            let selector: string
            // selector = "#primary > ytd-section-list-renderer"
            selector = "#thumbnail"
            // const allLinks: string[] = await page.evaluate(
            //     selector => Array.from(
            //         document.querySelectorAll(selector),
            //         (element: Element) => element.getAttribute("href")
            //     )
            // )
            // const allLinks: string[] = await page.$x('//*[@id="video-title"]')
            const allVideos: puppeteer.ElementHandle<Element>[] = await page.$x('//*[@id="video-title"]')
            // evaluate(
            //     () => window.XPathEvaluator(()=>('//*[@id="video-title"]'))
            // )
            console.log("allVideos: ", allVideos.length)
            // const allLinks: string[] = await allVideos.map((videoA) => {
            //     page.evaluate((videoA) => videoA.getAttribute("hred"))
            // })
            const allLinks: string[] = await page.evaluate((...allVideos) => {
                return allVideos.map(e => e.getAttribute("href"))
            })
            console.log("allLinks: ", allLinks)

            const res = await Promise.all(
                allLinks.map(async (el) => await page.evaluate(el => el.href))

            )
            console.log("res: ", res)

            const el1 = allVideos[1]
            const res2: string = await page.evaluate(el1 => el1.href)
            console.log("res2: ", res2)


            // const element: puppeteer.ElementHandle<Element> = (await page.$(selector)).asElement()

            // selector = "#video-title"
            // const videosTiles: puppeteer.ElementHandle<Element>[] = await element.$$(selector)
            // // console.log("all links example: ", allLinks[2].asElement())

            // console.log("all links: ", videosTiles.length)
            // const allLinks: string[] = await this.extractHrefs(videosTiles)



            // let result: string = await allLinks.evaluate(allLinks => allLinks.getAttribute("href"))
            // console.log("result ", result)

        } catch (error) {
            console.log("Problem na etapie wyszukiwania linków do konkretnych filmów.")
            throw error
        }
    }

    private async asyncextractHrefs(elements: puppeteer.ElementHandle<Element>[]): Promise<string[]> {
        const allLinks: string[] = []

        const el: puppeteer.ElementHandle<Element> = elements[0].asElement()
        const href: any = el.getProperty("jkh")
        console.log("href extracted: ", href)
        // elements.map(async (el) => {
        //     // const href: string = el.asElement(). getProperty("href")
        //     const href: any = await el.getProperty("jkh")
        //     console.log("href extracted: ", href)
        //     // allLinks.push(href)


        // })

        return
    }

}