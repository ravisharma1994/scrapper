const express = require('express')
const { chromium } = require('playwright');

const app = express();

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';


app.get('/', async (req, res) => {
    console.log("Just got a request!")

    let searchString = req.query.value;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
        userAgent: DEFAULT_USER_AGENT,
    });

    let ONE_SEC_IN_MS = 1000
    const totalWaitPeriord = ONE_SEC_IN_MS * 20

    await page.goto('https://www.mage.space/');

    // Fill in the form and submit it
    await page.fill('#search-bar', searchString || 'car');
    await page.click('.icon-tabler-arrow-right');
    console.log('BUTTON IS CLICKED');
    setTimeout(async () => {
        // await page.screenshot({ path: 'test.png' });
        console.log('GOT THE PAGE..');
        const IMAGE_SELECTOR = `#mantine-R3bm-body > div > div.mantine-Container-root.mantine-bpygq5 > div > div.mantine-1avyp1d > div > figure > div > img`

        let imageHref = await page.evaluate((sel) => {
            return document.querySelector(sel).getAttribute('src').replace('/', '');
        }, IMAGE_SELECTOR);

        console.log(imageHref);
        res.json({image : imageHref});
        await browser.close();
    }, totalWaitPeriord);
    console.log('Will wait for 30 sec');
});

app.get('/home', async (req, res) => {
    res.json({success : true});
});

app.listen(process.env.PORT || 3000);