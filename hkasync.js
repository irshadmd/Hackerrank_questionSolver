let puppeteer = require('puppeteer');
let { answers } = require('./code');
let loginUrl = "https://www.hackerrank.com/auth/login";


let browser, page;
let mail = "wemip31470@enamelme.com", password = "12345678", name = "IrshadBot";

(async function fn() {
    let browserObj = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"]
    });
    browser = browserObj
    console.log("browser opened");
    let newTab = await browserObj.newPage();
    console.log("new tab opened");
    await newTab.goto(loginUrl);
    page = newTab;
    await page.type("input[id='input-1']", mail, { delay: 50 });
    await page.type("input[type='password']", password, { delay: 50 });
    await page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
    console.log("Algo btn promise");
    await waitAndClick(".topic-card a[data-attr1='algorithms']", page);
    console.log("Warmup btn promise");
    await waitAndClick("input[value='warmup']", page);
    console.log("get All questionArr");
    questionsArr = await page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 });
    console.log(questionsArr.length);
    for (let i = 0; i < questionsArr.length; i++) {
        questionsArr = await page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 });
        await page.waitForTimeout(3000);
        await questionSolver(page, questionsArr[i], answers[i]);
        console.log("Question Solved :", i);
        await page.waitForTimeout(6000);
        await page.goBack();
    }
    console.log("All Questions Solved ");

})();

function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                return cPage.click(selector, { delay: 100 });
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(async function (resolve, reject) {
        let questionWillBeClickedPromise = await question.click();
        await waitAndClick('.monaco-editor.no-user-select.vs', page);
        await waitAndClick(".checkbox-input", page);
        await page.waitForSelector("textarea.custominput", { visible: true });
        await page.type("textarea.custominput", answer, { delay: 10 });
        await page.keyboard.down("Control");
        await page.keyboard.press("A", { delay: 100 });
        await page.keyboard.press("X", { delay: 100 });
        await page.keyboard.up("Control");
        await waitAndClick(".monaco-editor.no-user-select.vs", page);
        await page.keyboard.down("Control");
        await page.keyboard.press("A", { delay: 100 });
        await page.keyboard.press("V", { delay: 100 });
        await page.keyboard.up("Control");
        await page.click(".hr-monaco__run-code", { delay: 50 });
        // await page.type(String.fromCharCode(18))
        // await page.keyboard.press('Alt');
        // await page.keyboard.press('Backspace');
        // await page.keyboard.up("Alt");
        await resolve();

    })
}