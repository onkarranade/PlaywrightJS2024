const { test, expect} =require('@playwright/test');

test('email registration', async ({page})=> {


    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("//a[.='Register here']").click();
    await page.locator('#firstName').fill('qaonkar');
    await page.locator('#lastName').fill('qamaster');
    await page.locator("//input[@type='email']").fill('qaonkar7@mailinator.com');
    await page.locator('#userMobile').fill('6477526723');
    const dropdown=page.locator('//select');
    await dropdown.selectOption('Engineer');
    await page.locator("//input[@value='Male']").click();
    await page.locator('#userPassword').fill('Qa@123456');
    await page.locator('#confirmPassword').fill('Qa@123456');
    await page.locator("input[type='checkbox']").check();
    await page.locator('#login').click();
    await expect(page.locator('.headcolor')).toHaveText('Account Created Successfully');
    await page.pause();

})