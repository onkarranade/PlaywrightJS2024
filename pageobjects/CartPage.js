
const { expect } = require('@playwright/test');
class CartPage
{

    constructor(page)
    {
this.page=page;
this.cartProducts=page.locator('div li').first();;
this.checkoutButton=page.locator("//button[text()='Checkout']");
    }

    async checkout()
    {
await this.checkoutButton.click();
    }

    async verifyProductDisplayed(productName)
    {
 await this.cartProducts.waitFor();
 const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible();
 
    expect(bool).toBeTruthy();
    }
}

module.exports= {CartPage}