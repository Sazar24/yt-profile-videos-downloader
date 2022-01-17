### About:  
For private usage only. (So there is no high level interface or anything like this.)
Goal of application is to download all videos from youtube given profile (in mp4 format).
I did not check if its work with all kinds of youtube profiles. 
I just wanned to archive 300+ video clips to my hardware. Doing this manually would be cumbersome.


Class src/selenium/crawler.ts do the crawling - there you can change url from which videos shall be downloaded.
Crawling Library used: selenium-webdriver with chrome driver. Selenium chrome driver requires separated download and configure (system Env) (use google or link below).




#
## Tech things
Initial setup by:
https://medium.com/nmc-techblog/how-to-deploy-a-ts-node-js-app-in-minutes-e3ab17ab0673
https://github.com/Sazar24/ts-nodemon-starter

Chromedriver install (system env:):
https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/
--> setx PATH "%PATH%;C:\projects\js\chromedriver\96" 
(cmd "jako administrator")