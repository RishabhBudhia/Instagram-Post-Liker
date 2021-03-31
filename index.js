const puppeteer = require("puppeteer");
const data = require("./config.json");
let noOfPost = process.argv[2];
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" });
    await page.type("input[name='username']", data.user, { delay: 100 });
    await page.type("input[name='password']", data.pwd, { delay: 100 });
    // await page.click("button[type='submit']")
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("button[type='submit']"),
    ]);

    await page.type("input[placeholder='Search']", data.account_name);
    await page.waitForSelector(" .fuqBx a", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(" .fuqBx a"),
    ]);

    await page.waitForSelector("._9AhH0", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0"),
    ]);

    var i = 0;
    do {
        await page.waitForSelector(".fr66n button", { visible: true });
        await page.click(".fr66n button"),
            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle2" }),
                page.click(". _65Bje.coreSpriteRightPaginationArrow"),
            ]);
    } while (i < noOfPost);

    // await browser.close();
})();
