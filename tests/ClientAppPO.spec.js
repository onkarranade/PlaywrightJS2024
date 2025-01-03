const { test, expect} =require('@playwright/test');
const {LoginPage} =require('../pageobjects/LoginPage');
const {DashboardPage} =require('../pageobjects/DashboardPage')

const useremail='qaonkar7@mailinator.com';
const password='Qa@123456';
const productName='ADIDAS ORIGINAL';


test('client login test', async ({page})=> {

    const loginPage=new LoginPage(page);
    const dashboardPage=new DashboardPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(useremail,password);
    await dashboardPage.searchProducts(productName);
   await dashboardPage.navigateToCart();
    

   


})