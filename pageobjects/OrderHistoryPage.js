
const { expect } = require("@playwright/test");
class OrderHistoryPage 
{
    constructor(page)
    {   
        this.page=page;
        this.orderTable=page.locator('tbody');
        this.orderRows=page.locator('tbody tr');
        this.OrderText=page.locator('.col-text');

    }
     async viewProduct(orderId)
     {
        await this.orderTable.waitFor();

        const rows=await this.orderRows;
        for(let j=0; j< await rows.count();j++)
        {
           const rowOrderId=await rows.nth(j).locator('th').textContent();
           if(orderId.includes(rowOrderId))
           {
               await rows.nth(j).locator('button').first().click();
               break;
           }
        }

     }

     async confirmProduct(orderId)
     {
        await this.OrderText.waitFor();
             const orderIdDetails=await this.page.locator('.col-text').textContent();
             expect(orderId.includes(orderIdDetails)).toBeTruthy();
     }

}

module.exports = { OrderHistoryPage}