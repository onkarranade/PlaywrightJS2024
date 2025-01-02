const { test, expect, request} =require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');



const loginPayload= {userEmail: "qaonkar7@mailinator.com", userPassword: "Qa@123456"};
const orderPayload={orders: [{country: "India", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]};
const fakePayloadOrders = { data: [],message : 'No Orders'};
let response;

test.beforeAll('login', async()=> {
const apiContext=await request.newContext();
const apiUtils =new APIUtils(apiContext,loginPayload);
response=await apiUtils.createOrder(orderPayload);
    
})
test('empty orders', async ({page})=> {

    await page.addInitScript(value=> {
        window.localStorage.setItem('token',value);
        },response.token);
        await page.goto('https://rahulshettyacademy.com/client/');
        
   await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/673b6109ae2afd4c0bc45f30', async route => {


        const response=await page.request.fetch(route.request());
        let body=JSON.stringify(fakePayloadOrders);
        route.fulfill({
            response,
            body,

        })
    })
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    
   await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
   console.log(await page.locator('.mt-4').textContent());
       // await page.locator('tbody').waitFor();


})