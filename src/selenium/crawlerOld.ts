
import { By, Key, Builder } from "selenium-webdriver";
// require("chromedriver");
// require('chromedriver');
import webdriver = require('selenium-webdriver');
// var webdriver = require('selenium-webdriver');
// import chrome = require('selenium-webdriver/chrome');
// import path = require('chromedriver');

export class YtCrawler {
    async runAsync(): Promise<void> {
        await this.extractLinks()

    }

    private async extractLinks() {
        // let driver = await new Builder().forBrowser('chrome').build();

        // const driver2 = new webdriver.Builder()
        // .withCapabilities(webdriver.Capabilities.chrome())
        // .build();

        // const service = new chrome.ServiceBuilder(path.path).build();
        // chrome.setDefaultService(service);

        // const driver = new webdriver.Builder()
        //     .withCapabilities(webdriver.Capabilities.chrome().setBrowserVersion("96"))
        //     .build();
        // await driver.get('https://selenium.dev');

        // await driver.quit();

        require('chromedriver');
        // const webdriver = require('selenium-webdriver');
        // const driver = new webdriver.Builder()
        //     .forBrowser('chrome')
        //     .build();
        let driver = await new Builder()
            .withCapabilities(webdriver.Capabilities.chrome().setAlertBehavior("ignore"))
            .forBrowser('chrome').build();

        // const options = webdriver.ChromeOptions() 

        // driver.get("google.pl")
        await driver.get('https://selenium.dev');

        await new Promise((res) => setTimeout(() => res(null), 4000))
        await driver.sleep(5)
        await driver.quit();
        // var service = new chrome.ServiceBuilder(path).build();
        // chrome.setDefaultService(service);

    }
}