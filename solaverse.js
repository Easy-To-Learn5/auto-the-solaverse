const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const fetch = require('node-fetch');


const chromePaths = require('chrome-paths');
const fs = require('fs');
const delay = require('delay');
const cron = require('node-cron');


const generateIndoName = () => new Promise((resolve, reject) => {
    fetch('https://swappery.site/data.php?qty=1', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});


const cookieHelpers = (arrayCookie) => {
    let newCookie = '';
    for (let index = 0; index < arrayCookie.length; index++) {
        const element = arrayCookie[index];
        if (index < arrayCookie.length - 1) {
            newCookie += element.split(';')[0] + '; ';
        } else {
            newCookie += element.split(';')[0];
        }

    }
    return newCookie
};



const functionGetLink = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
            "upgrade-insecure-requests": 1,
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > div > a").attr("href");
            resolve(src);
        })
        .catch(err => reject(err));
});

const getNewPageWhenLoaded = async (browser) => {
    return new Promise(x =>
        browser.on('targetcreated', async target => {
            if (target.type() === 'page') {
                const newPage = await target.page();
                const newPagePromise = new Promise(y =>
                    newPage.once('domcontentloaded', () => y(newPage))
                );
                const isPageLoaded = await newPage.evaluate(
                    () => document.readyState
                );
                return isPageLoaded.match('complete|interactive')
                    ? x(newPage)
                    : x(newPagePromise);
            }
        })
    );
};


(async () => {

    while (true) {
        const domain = 'ancreator.com';
        const indoName = await generateIndoName();
        const { result } = indoName;
        const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase();
        const email = `${name}@${domain}`;

        const metamaskExtension = '/Users/aminudin/Library/Application Support/Google/Chrome/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/10.11.3_0';

        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--disable-accelerated-2d-canvas',
            '--no-zygote',
            '--no-first-run',
            '--disable-dev-shm-usage',
            '--window-size=1920x1080',
            `--disable-extensions-except=${metamaskExtension}`,
            `--load-extension=${metamaskExtension}`,
            '--enable-automation'
        ];


        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            executablePath: chromePaths.chrome,
            slowMo: 0,
            devtools: false,
            args
        });


        const pages = await browser.pages();
        const page = pages[0];
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://thesolaverse.com/register', {
            waitUntil: 'networkidle0',
            timeout: 120000,
        });


        await delay(5000);
        const pagesNew = await browser.pages();
        const page2 = pagesNew[1];
        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div > button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div > button").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div.select-action__wrapper > div > div.select-action__select-buttons > div:nth-child(2) > button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div.select-action__wrapper > div > div.select-action__select-buttons > div:nth-child(2) > button").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div > div.metametrics-opt-in__footer > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.page-container__footer-button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div > div.metametrics-opt-in__footer > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.page-container__footer-button").click());

        await page2.waitForSelector("#create-password");
        await page2.type("#create-password", 'etlgoingtobegood', { delay: 30 });

        await page2.waitForSelector("#confirm-password");
        await page2.type("#confirm-password", 'etlgoingtobegood', { delay: 30 });

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div:nth-child(2) > form > div.first-time-flow__checkbox-container > div');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div:nth-child(2) > form > div.first-time-flow__checkbox-container > div").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div:nth-child(2) > form > button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div:nth-child(2) > form > button").click());

        // await page2.waitForSelector('//*[@id="app-content"]/div/div[2]/div/div/div[2]/div/div[1]/div[2]/button');
        // await page2.evaluate(() => document.querySelector('//*[@id="app-content"]/div/div[2]/div/div/div[2]/div/div[1]/div[2]/button').click());
        await delay(7000)
        const elements = await page2.$x('//*[@id="app-content"]/div/div[2]/div/div/div[2]/div/div[1]/div[2]')
        await elements[0].click()

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div > div.reveal-seed-phrase > div.reveal-seed-phrase__buttons > button.button.btn--rounded.btn-secondary.first-time-flow__button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div > div.reveal-seed-phrase > div.reveal-seed-phrase__buttons > button.button.btn--rounded.btn-secondary.first-time-flow__button").click());

        await page2.waitForSelector('#app-content > div > div.app-header.app-header--back-drop > div > div.app-header__account-menu-container > div.account-menu__icon > div > div > div');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.app-header.app-header--back-drop > div > div.app-header__account-menu-container > div.account-menu__icon > div > div > div").click());

        await page2.waitForSelector('#app-content > div > div.account-menu > div:nth-child(11)');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.account-menu > div:nth-child(11)").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.settings-page__content > div.settings-page__content__tabs > div > button:nth-child(4) > div.tab-bar__tab__content');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.settings-page__content > div.settings-page__content__tabs > div > button:nth-child(4) > div.tab-bar__tab__content").click());

        // reveal
        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.settings-page__content > div.settings-page__content__modules > div.settings-page__body > div:nth-child(1) > div:nth-child(2) > div > button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.settings-page__content > div.settings-page__content__modules > div.settings-page__body > div:nth-child(1) > div:nth-child(2) > div > button").click());

        await page2.waitForSelector("#password-box");
        await page2.type("#password-box", 'etlgoingtobegood', { delay: 30 });

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.btn--large.page-container__footer-button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.btn--large.page-container__footer-button").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.btn--large.page-container__footer-button');
        await page2.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.btn--large.page-container__footer-button").click());

        await page2.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.page-container__content > div.reveal-seed__content > div > div > div.export-text-container__text-container > div');
        let elementTextPharse = await page2.$('#app-content > div > div.main-container-wrapper > div > div.page-container__content > div.reveal-seed__content > div > div > div.export-text-container__text-container > div');
        let valueTextPharse = await page2.evaluate(el => el.textContent, elementTextPharse);
        fs.appendFileSync('wallet.txt', `${valueTextPharse}|${email}|etlgoingtobegood\n`, 'utf-8');


        await page.bringToFront();

        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });


        await page.waitForSelector("#name");
        await page.type("#name", name, { delay: 30 });

        await page.waitForSelector("#email");
        await page.type("#email", email, { delay: 30 });

        await page.waitForSelector("#password");
        await page.type("#password", 'etlgoingtobegood', { delay: 30 });

        await page.waitForSelector("#password_confirmation");
        await page.type("#password_confirmation", 'etlgoingtobegood', { delay: 30 });

        await page.waitForSelector('#submit > button');
        await page.evaluate(() => document.querySelector("#submit > button").click());

        const page3 = await browser.newPage();
        await page3.goto('https://generator.email/' + email, {
            waitUntil: 'networkidle0',
            timeout: 120000,
        });

        await page3.reload();

        await page3.waitForSelector('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table.action > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a');
        await page3.evaluate(() => document.querySelector("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table.action > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a").click());
        await delay(5000)

        const pagesNew4 = await browser.pages();
        const page4 = pagesNew4[3];

        await page4.waitForSelector('#tokens > div > ul > li:nth-child(1) > a');
        await page4.evaluate(() => document.querySelector("#tokens > div > ul > li:nth-child(1) > a").click());

        await delay(3000)

        await page4.waitForSelector('#add-wallet');
        await page4.evaluate(() => document.querySelector("#add-wallet").click());

        await page4.waitForSelector('#btn-connect');
        await page4.evaluate(() => document.querySelector("#btn-connect").click());

        await page4.waitForSelector('#WEB3_CONNECT_MODAL_ID > div > div > div.sc-fujyUd.chnMFN.web3modal-modal-card > div:nth-child(1) > div > div.sc-dlnjPT.eFHlqH.web3modal-provider-description');
        await page4.evaluate(() => document.querySelector("#WEB3_CONNECT_MODAL_ID > div > div > div.sc-fujyUd.chnMFN.web3modal-modal-card > div:nth-child(1) > div > div.sc-dlnjPT.eFHlqH.web3modal-provider-description").click());

        // metamask popup
        try {
            const newPagePromise = await getNewPageWhenLoaded(browser);
            const newPage = await newPagePromise;

            await newPage.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.permissions-connect-choose-account > div.permissions-connect-choose-account__footer-container > div.permissions-connect-choose-account__bottom-buttons > button.button.btn--rounded.btn-primary');
            await newPage.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.permissions-connect-choose-account > div.permissions-connect-choose-account__footer-container > div.permissions-connect-choose-account__bottom-buttons > button.button.btn--rounded.btn-primary").click());

            await newPage.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.page-container.permission-approval-container > div.permission-approval-container__footers > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.page-container__footer-button');
            await newPage.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.page-container.permission-approval-container > div.permission-approval-container__footers > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.page-container__footer-button").click());

            await newPage.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button');
            await newPage.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button").click());

            await newPage.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button');
            await newPage.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button").click());

        } catch (err) {
            console.log('')
        }

        await page4.waitForSelector('#btn-add-wallet');
        await page4.evaluate(() => document.querySelector("#btn-add-wallet").click());

        try {
            const newPagePromise = await getNewPageWhenLoaded(browser);
            const newPage = await newPagePromise;

            await newPage.waitForSelector('#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button');
            await newPage.evaluate(() => document.querySelector("#app-content > div > div.main-container-wrapper > div > div.request-signature__footer > button.button.btn--rounded.btn-primary.btn--large.request-signature__footer__sign-button").click());

        } catch (err) {
            console.log('')
        }


        await delay(1000)
        await page4.waitForSelector('#rewards-banner > div.cta > p > a');
        await page4.evaluate(() => document.querySelector("#rewards-banner > div.cta > p > a").click());

        await page4.waitForSelector('#available-missions-table > tbody > tr > td.actions > p:nth-child(3) > a');
        await page4.evaluate(() => document.querySelector("#available-missions-table > tbody > tr > td.actions > p:nth-child(3) > a").click());

        await delay(2000)

        const uploadImage = await page4.$("#complete-mission-form > form > input.file");
        await uploadImage.uploadFile('./saktiku.jpeg');
        await page4.click('#complete-mission-form > form > input.button');

        await delay(3000)

        await browser.close()


    }
})();
