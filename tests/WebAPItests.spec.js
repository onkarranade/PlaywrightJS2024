const { test, expect,request} =require('@playwright/test');
const loginPayload= {userEmail: "qaonkar7@mailinator.com", userPassword: "Qa@123456"};
const orderPayload={orders: [{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let token;
let orderId;

test.beforeAll('login', async()=> {


    //loginAPI
const apiContext=await request.newContext();
const loginResponse=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:loginPayload});
expect(loginResponse.ok()).toBeTruthy();

const loginResponseJson=await loginResponse.json();
token= loginResponseJson.token;
console.log(token);

//orderAPI
const orderResponse=await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {data : orderPayload,
        headers : {
            'Authorization' :token,
            'content-type' : 'application/json'
        }
    },
)

const orderResponseJson=await orderResponse.json();
console.log(orderResponseJson);
orderId=orderResponseJson.orders[0];
    
})



test('client login', async ()=> {
    await page.addInitScript(value=> {
        window.localStorage.setItem('token',value);
        },token);
        await page.goto('https://rahulshettyacademy.com/client/');

})
test('client app login with api', async ({page})=> {

   await page.addInitScript(value=> {
    window.localStorage.setItem('token',value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
     await page.locator('tbody').waitFor();

     const rows=await page.locator('tbody tr');
     for(let j=0; j< await rows.count();j++)
     {
        const rowOrderId=await rows.nth(j).locator('th').textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(j).locator('button').first().click();
            break;
        }
     }
     await page.locator('.col-text').waitFor();
     const orderIdDetails=await page.locator('.col-text').textContent();
    
     await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
})