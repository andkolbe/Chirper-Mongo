const puppeteer = require('puppeteer');

// jest looks for files that end in test.ts
test('Adds two numbers', () => {
    const sum = 1 + 2;

    expect(sum).toEqual(3);
});

test('We can launch a browser', async () => {
    const browser = await puppeteer.launch({
        headless: false // false - do not start in headless mode. We want to see the GUI when the browser starts up
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    const text = await page.$eval('a.btn', el => el.innerHTML);

    expect(text).toEqual('Login');
});

// Chromium runs in an entirely different environment than Node. 
// Puppeteer takes the code that we wrote and serializes it into text. That text then gets communicated from our NodeJS runtime to the Chromium browser
// It then gets parsed back into Javascript code and evaluated inside the browser