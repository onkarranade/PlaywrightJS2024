const { test, expect} =require('@playwright/test');
const { text } = require('stream/consumers');

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

test('product name find', async ({page})=> {


    const productName='ZARA COAT 3';
   await page.goto('https://rahulshettyacademy.com/client/');
   // await page.locator('#username').fill('');
    await page.locator('#userEmail').fill('qaonkar7@mailinator.com');
    await page.locator('#userPassword').fill('Qa@123456');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    const products=page.locator('.card-body');
    const count=products.count();

    for(let i=0;i<count;i++)
    {


if(await products.nth(i).locator('b').textContent()===productName)
{
   //add product to cart
   await products.nth(i).locator("text= Add To Cart").click();
}
    }
    

})


test('Create an Order' , async ({page})=> {
    const productName='ZARA COAT 3';
    const email='qaonkar7@mailinator.com';
    await page.goto('https://rahulshettyacademy.com/client/');
     await page.locator('#userEmail').fill('qaonkar7@mailinator.com');
     await page.locator('#userPassword').fill('Qa@123456');
     await page.locator('#login').click();
     await page.waitForLoadState('networkidle');
 
     const products=page.locator('.card-body');
     const count=await products.count();
    
     for(let i=0;i<count;i++)
     {

        if(await products.nth(i).locator('b').textContent()===productName)
        {
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
     }
     await page.locator("[routerlink*='/cart']").click();
     await page.locator('div li').first().waitFor();

     const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
     expect(bool).toBeTruthy();
     await page.locator("//button[text()='Checkout']").click();
     await page.locator("[placeholder*='Country']").pressSequentially('Ind',{delay:100});
     const dropdown=page.locator(".ta-results");
     await dropdown.waitFor();

     const optionsCount=await dropdown.locator("button").count();

     for(let i=0;i<optionsCount;i++)
     {
      const text= await dropdown.locator("button").nth(i).textContent();
       if(text===" India")
       {
        await dropdown.locator("button").nth(i).click();
        break;
       }
     }
     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
     page.locator('.action__submit').click();
     await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
     let orderID= await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
     console.log(orderID);
     await page.locator("button[routerlink*='/dashboard/myorders']").click();
     await page.locator('tbody').waitFor();

     const rows=await page.locator('tbody tr');
     for(let j=0; j< await rows.count();j++)
     {
        const rowOrderId=await rows.nth(j).locator('th').textContent();
        if(orderID.includes(rowOrderId))
        {
            await rows.nth(j).locator('button').first().click();
            break;
        }
     }
await page.locator('.col-text').waitFor();
     const orderIdDetails=await page.locator('.col-text').textContent();
     expect(orderID.includes(orderIdDetails)).toBeTruthy();
     page.pause();
})


