const { test, expect, chromium } = require('@playwright/test');

const {
    email,
    password,
    incorrectEmail,
    incorrectPassword,
  } = require("../user");

test('Successful authorization', async ({ page }) => {
    const browser = await chromium.launch({
        headless: false,
      });

  // Go to https://netology.ru/
  await page.goto('https://netology.ru/');

  // Click text=Войти
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);

  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');

  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);

  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]')
  ]);
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
});


test("Unsuccessful authorization", async ({ page }) => {
    const browser = await chromium.launch({
      headless: false,
    });
  
    // Go to https://netology.ru/
  await page.goto('https://netology.ru/');

  // Click text=Войти
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', incorrectEmail);

  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');

  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', incorrectPassword);
  await page.click('[data-testid="login-submit-btn"]');
  
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotFailed.png", fullPage: true });
  await browser.close();
  });