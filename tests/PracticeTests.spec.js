const { test, expect} =require('@playwright/test');

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

test('dropdown', async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.getByRole('radio', {name:'User'}).check();
    expect( await page.getByRole('radio', {name:'User'})).toBeChecked();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();

//    await page.pause();


})


test('child window selection', async ({browser})=>{


    const context=await browser.newContext();
    const page=await context.newPage();

    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docLink=page.locator("[href*='documents-request']");

    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        docLink.click()

    ])
    const text=await newPage.locator('.im-para.red').textContent();
    console.log(text);

})


