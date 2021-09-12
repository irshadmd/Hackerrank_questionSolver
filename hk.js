let puppeteer = require('puppeteer');
let { answers } = require('./code');
let loginUrl = "https://www.hackerrank.com/auth/login";

let browserStartProm = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"]
});

let browser, page;
let mail = "wemip31470@enamelme.com", password = "12345678", name = "IrshadBot";

browserStartProm.then(function (browserObj) {
    browser = browserObj
    console.log("browser opened");
    let browserTabOpen = browserObj.newPage();
    return browserTabOpen;
}).then(function (newTab) {
    console.log("new tab opened");
    let pageOpenPromise = newTab.goto(loginUrl);
    page = newTab;
    return pageOpenPromise;
}).then(function () {
    let emailWillBeEntered = page.type("input[id='input-1']", mail, { delay: 50 });
    return emailWillBeEntered;
}).then(function () {
    let passWillBeEntered = page.type("input[type='password']", password, { delay: 50 });
    return passWillBeEntered;
}).then(function () {
    let loginWillBeDOnepromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
    return loginWillBeDOnepromise;
}).then(function () {
    console.log("Algo btn promise");
    return waitAndClick(".topic-card a[data-attr1='algorithms']", page);
}).then(function () {
    console.log("Warmup btn promise");
    return waitAndClick("input[value='warmup']", page);
}).then(function () {
    console.log("get All questionArr");
    let AllChallangesArr = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 100 });
    return AllChallangesArr;
}).then(function (questionsArr) {
    console.log(questionsArr.length);
    return questionSolver(page, questionsArr[0], answers[0]);
}).then(function () {
    console.log("Question Solved");
})


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
    return new Promise(function (resolve, reject) {
        let questionWillBeClickedPromise = question.click();
        questionWillBeClickedPromise
            .then(function () {
                return waitAndClick('.monaco-editor.no-user-select.vs', page);
            }).then(function () {
                return waitAndClick(".checkbox-input", page);
            }).then(function () {
                return page.waitForSelector("textarea.custominput", { visible: true });
            }).then(function () {
                return page.type("textarea.custominput", answer, { delay: 10 });
            }).then(function () {
                return page.keyboard.down("Control");
            }).then(function () {
                return page.keyboard.press("A", { delay: 100 });
            }).then(function () {
                return page.keyboard.press("X", { delay: 100 });
            }).then(function () {
                return page.keyboard.up("Control");
            }).then(function () {
                return waitAndClick(".monaco-editor.no-user-select.vs", page);
            }).then(function () {
                return page.keyboard.down("Control");
            }).then(function () {
                return page.keyboard.press("A", { delay: 100 });
            }).then(function () {
                return page.keyboard.press("V", { delay: 100 });
            }).then(function () {
                return page.keyboard.up("Control");
            }).then(function () {
                return page.click(".hr-monaco__run-code", { delay: 50 });
            }).then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err)
                reject(err);
            })
    })
}