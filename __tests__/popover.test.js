const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: 'new' });
  page = await browser.newPage();
  await page.goto('http://localhost:8080');
});

afterAll(async () => {
  await browser.close();
});

test('Popover появляется при клике, содержит правильный заголовок и текст, и скрывается при повторном клике', async () => {
  await page.waitForSelector('.btn');
  await page.click('.btn');
  const popover = await page.waitForSelector('.popover', { visible: true });
  expect(popover).toBeTruthy();
  
  const headerText = await page.$eval('.popover-header', el => el.textContent);
  const bodyText = await page.$eval('.popover-body', el => el.textContent);
  expect(headerText).toBe('Popover title');
  expect(bodyText).toBe('And here\'s some amazing content. It\'s very engaging. Right?');
  
  await page.click('.btn');
  await page.waitForSelector('.popover', { hidden: true });
  const hiddenPopover = await page.$('.popover');
  expect(hiddenPopover).toBeNull();
});

test('Клик вне popover закрывает его', async () => {
  await page.click('.btn');
  await page.waitForSelector('.popover', { visible: true });
  await page.click('body');
  await page.waitForSelector('.popover', { hidden: true });
  const hidden = await page.$('.popover');
  expect(hidden).toBeNull();
});
