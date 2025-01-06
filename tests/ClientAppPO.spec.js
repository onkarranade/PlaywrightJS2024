const { test, expect} =require('@playwright/test');
const fs=require('fs');
const path = require('path');
const { LoginPage } =require('../pageobjects/LoginPage');
const { DashboardPage } =require('../pageobjects/DashboardPage')
const { CartPage } =require('../pageobjects/CartPage');
const { OrderReviewPage } = require('../pageobjects/OrderReviewPage');
const { OrderHistoryPage }=require('../pageobjects/OrderHistoryPage');
const jsonFilePath = path.join(__dirname, '../utils/TestData.json');
const dataset=JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
const useremail='qaonkar7@mailinator.com';
const password='Qa@123456';
const productName='ADIDAS ORIGINAL';
//console.log(data);

test.skip('complete order test', async ({page})=> {

    const loginPage=new LoginPage(page);
    const dashboardPage=new DashboardPage(page);
    const cartPage=new CartPage(page);
    const orderReviewPage=new OrderReviewPage(page);
    const orderHistoryPage=new OrderHistoryPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(data.useremail,data.password);
    await dashboardPage.searchProducts(data.productName);
   await dashboardPage.navigateToCart();
   await cartPage.verifyProductDisplayed(data.productName);
    await cartPage.checkout();
    await orderReviewPage.searchCountryandSelect();
    const orderId = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await orderReviewPage.GoToOrders();
    await orderHistoryPage.viewProduct(orderId);
    await orderHistoryPage.confirmProduct(orderId);

    

   


})

test.skip('sample test', async ({page})=> {

    await page.goto('https://rahulshettyacademy.com/client/');
     await page.locator('#userEmail').fill(data.useremail);
     await page.locator('#userPassword').fill(data.password);
     await page.locator('#login').click();
     await page.waitForLoadState('networkidle');
})


for(const data of dataset)
{
    test(`data driven test  for ${data.useremail}`,async ({page})=> {
        await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('#userEmail').fill(data.useremail);
        await page.locator('#userPassword').fill(data.password);
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle');
    
    
    })
}
