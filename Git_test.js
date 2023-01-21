const { chromium } = require('playwright');

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';



(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
        userAgent: DEFAULT_USER_AGENT,
    });

    let ONE_SEC_IN_MS = 1000
    const totalWaitPeriord = ONE_SEC_IN_MS * 20

   

    try{
        setInterval(async() =>{
            try {
                await page.goto('https://github.com/SubhamSubhasisPatra');
            } catch (error) {
                
            }
       },2000);
    } catch (err) {

    } 
    
})();