const { page,test, expect} =require('@playwright/test');

test('incorrect login test', async ({page})=> {

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator('#username').fill('qaonkar3@mailinator.com');
await page.locator('#password').fill('Qa@123456');
await page.locator('#signInBtn').click();
await page.locator('#username').type

console.log(await page.locator("div[style*='block']").textContent());
await expect(page.locator("div[style*='block']")).toContainText('Incorrect username/password.');
})  


test('get product list', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();

    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(2).textContent());

})

test('assertion test',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();

});

test.only('dropdown', async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.getByRole('radio', {name:'User'}).check();
    await page.locator('#okayBtn').click();
    await page.pause();


})
