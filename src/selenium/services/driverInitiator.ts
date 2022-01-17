const { Builder, By, Key, until, _ } = require('selenium-webdriver');
// import chrome = require("selenium-webdriver/chrome");
import * as chrome from 'selenium-webdriver/chrome'
import webdriver = require('selenium-webdriver');

// import webdriver = require('selenium-webdriver');

export class DriverInitiator {
    // async getDriver(): Promise<void> {
    async getDriver(): Promise<webdriver.WebDriver> {

        // var options = new chrome.Options().setChromeBinaryPath('x:\\path\\chrome.exe');
        // var options = new chrome.Options().setChromeBinaryPath('C:\\projects\\js\\chromedriver\\96\\chromedriver.exe');
        // const options = new chrome.Options().setChromeBinaryPath('C:/projects/js/chromedriver/96/chromedriver.exe/dsf');
        // const options = new chrome.Options().setChromeBinaryPath('C:/Program Files/Google/Chrome/Application/chrome.exe');
        // const options = new chrome.Options().setChromeBinaryPath('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');

        const options = new chrome.Options()
        // const options = webdriver.Capabilities.chrome().setAlertBehavior("ignore")
        // options.setChromeBinaryPath('C:/projects/js/chromedriver/96');
        options.excludeSwitches('enable-logging');
        // options.windowSize()
        options.addArguments("start-fullscreen")


        // const driver = await new Builder().forBrowser("chrome").withCapabilities(options).build();
        // require('chromedriver');
        // const driver = await new Builder().withCapabilities(options).forBrowser("chrome").withCapabilities(options).build();
        // const driver = await new Builder().withCapabilities(options).forBrowser("chrome").withCapabilities(options).build();
        const driver: webdriver.WebDriver = await new Builder()
            .forBrowser('chrome')
            .withCapabilities(options).build();


        // and finally:
        // driver = new Builder().forBrowser(browserName).withCapabilities(options).build();
        // require('chromedriver');
        // let driver = await new Builder()
        //     .withCapabilities(webdriver.Capabilities.chrome().setAlertBehavior("ignore"))
        //     .forBrowser('chrome').build();
        // await driver.get('https://selenium.dev');

        // await new Promise((res) => setTimeout(() => res(null), 4000))
        // await driver.sleep(5)
        // await driver.quit();
        return driver

    }
}
