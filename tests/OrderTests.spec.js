const { test, expect} =require('@playwright/test');

test('complete order test', async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('qaonkar7@mailinator.com');
    await page.getByPlaceholder('enter your passsword',{exact :true}).fill('Qa@123456');
    await page.getByRole('button', {name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await page.locator('.card-body').filter({hasText : 'ZARA COAT 3'}).getByRole('button', {name : ' Add To Cart'}).click();
    await page.getByRole('listitem').getByRole('button', {name : 'Cart'}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.getByRole('button', {name : 'Checkout'}).click();
    await page.getByPlaceholder('Select Country').pressSequentially('Ind', {delay :100});
    await page.getByRole('button', {name : 'India'}).nth(1).click();
    await page.getByText('Place Order ').click();
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
    await page.pause();

}) 