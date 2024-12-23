const { test, expect} =require('@playwright/test');
let webContext;
test.beforeAll('before any test is run', async ({browser})=> {
    
   const context= await browser.newContext();
   const page= await context.newPage();
   
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('qaonkar7@mailinator.com');
    await page.getByPlaceholder('enter your passsword',{exact :true}).fill('Qa@123456');
    await page.getByRole('button', {name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext= await browser.newContext({storageState : 'state.json'});
})

test('product titles', async ()=> {
    
    const email='';
    const productName='Zara Coat 4';

   const page= await webContext.newPage()
   await page.goto('https://rahulshettyacademy.com/client/');
    const products=page.locator('.card-body');
    const titles=await page.locator('.card-body b').allTextContents();
    console.log(titles);


    
})