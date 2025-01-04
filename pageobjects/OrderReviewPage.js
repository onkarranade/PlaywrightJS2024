const { expect } = require("@playwright/test");
class OrderReviewPage
{
    constructor(page)
    {
this.page=page;
this.country= page.locator("[placeholder*='Country']");
this.dropdown=page.locator(".ta-results");
this.submit = page.locator('.action__submit');
this.emailId = page.locator(".user__name [type='text']").first();
this.orderConfirmationText = page.locator(".hero-primary");
this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
this.orders=page.locator("button[routerlink*='/dashboard/myorders']");

    }


    async searchCountryandSelect()
    {
        await this.country.pressSequentially('ind',{delay:100});
        await this.dropdown.waitFor();

     const optionsCount=await this.dropdown.locator("button").count();
        console.log(optionsCount);
     for(let i=0;i<optionsCount;i++)
     { 
      const text= await this.dropdown.locator("button").nth(i).textContent();
      console.log(text);
       if(text===' India')
       {
        await this.dropdown.locator("button").nth(i).click();
        break;
       }
     }
    }

    async VerifyEmailId(username)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}

async GoToOrders()
{
    await this.orders.click();
}

}
module.exports= {OrderReviewPage}