const { test, expect,request} =require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');


const loginPayload= {userEmail: "qaonkar7@mailinator.com", userPassword: "Qa@123456"};
const orderPayload={orders: [{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let response;

test.beforeAll('login', async()=> {
const apiContext=await request.newContext();
const apiUtils =new APIUtils(apiContext,loginPayload);
response=await apiUtils.createOrder(orderPayload);
    
})



/*test('client login', async ()=> {
    await page.addInitScript(value=> {
        window.localStorage.setItem('token',value);
        },token);

      
        await page.goto('https://rahulshettyacademy.com/client/');

})*/
test('place order with API', async ({page})=> {


   await page.addInitScript(value=> {
    window.localStorage.setItem('token',value);
    },response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
     await page.locator('tbody').waitFor();

     const rows=await page.locator('tbody tr');
     for(let j=0; j< await rows.count();j++)
     {
        const rowOrderId=await rows.nth(j).locator('th').textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(j).locator('button').first().click();
            break;
        }
     }
     await page.locator('.col-text').waitFor();
     const orderIdDetails=await page.locator('.col-text').textContent();
    
    // await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})