const { test, expect} =require('@playwright/test');
const { LoginPage } =require('../pageobjects/LoginPage');
const { DashboardPage } =require('../pageobjects/DashboardPage')
const { CartPage } =require('../pageobjects/CartPage');
const { OrderReviewPage } = require('../pageobjects/OrderReviewPage');
const { OrderHistoryPage }=require('../pageobjects/OrderHistoryPage');
const useremail='qaonkar7@mailinator.com';
const password='Qa@123456';
const productName='ADIDAS ORIGINAL';


test('client login test', async ({page})=> {

    const loginPage=new LoginPage(page);
    const dashboardPage=new DashboardPage(page);
    const cartPage=new CartPage(page);
    const orderReviewPage=new OrderReviewPage(page);
    const orderHistoryPage=new OrderHistoryPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(useremail,password);
    await dashboardPage.searchProducts(productName);
   await dashboardPage.navigateToCart();
   await cartPage.verifyProductDisplayed(productName);
    await cartPage.checkout();
    await orderReviewPage.searchCountryandSelect();
    const orderId = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await orderReviewPage.GoToOrders();
    await orderHistoryPage.viewProduct(orderId);
    await orderHistoryPage.confirmProduct(orderId);

    

   


})