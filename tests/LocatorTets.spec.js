const { test, expect} =require('@playwright/test');

test('get by label test', async ({page})=> {

   await page.goto('https://rahulshettyacademy.com/angularpractice/');
 //   await page.getByLabel('Name').fill('qaonkar7@mailinator.com');
    await page.getByLabel('Password').fill('Qa@12');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Student').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button',{name: 'Submit'}).click();
    await page.getByRole('button', { name : 'Submit', checked : true,disabled: true,});
    
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', {name : 'Shop'}).click();
    await page.locator('app-card').filter({hasText : 'Nokia Edge'}).getByRole('button', {name : 'Add '});
})