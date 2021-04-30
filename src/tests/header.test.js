// jest looks for files that end in test.ts
const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

let browser, page; // initializing these variables here allows them to be available inside the scope of the entire file

beforeEach(async () => { // this function will be automatically invoked before every single test gets executed inside this file
    browser = await puppeteer.launch({
        headless: false // false - do not start in headless mode. We want to see the GUI when the browser starts up
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');

})

afterEach(async () => { // close the browser after all of the tests are done running
    await browser.close()
})

test('The header has the correct text', async () => {

    const text = await page.$eval('a.btn', el => el.innerHTML);

    expect(text).toEqual('Login');
});

test('clicking login starts oauth flow', async () => {
    await page.click('.btn-warning')

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
})

test('When signed in, shows logout button', async () => {
    const user = await userFactory(); // userFactory returns new User({}).save() which is an asyncronous operation
    const { session, sig } = sessionFactory(user);

    await page.setCookie({ name: 'session', value: session })
    await page.setCookie({ name: 'session.sig', value: sig })
    await page.goto('localhost:3000');
    await page.waitFor('a[href="/auth/logout"]')

    const text = await page.$eval('a[href="/auth/logout]', el => el.innerHTML)
    expect(text).toEqual('Logout');

})

// Chromium runs in an entirely different environment than Node
// Puppeteer takes the code that we wrote and serializes it into text. That text then gets communicated from our NodeJS runtime to the Chromium browser
// It then gets parsed back into Javascript code and evaluated inside the browser

