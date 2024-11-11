const {test, expect} =require('@playwright/test');


test('single dropdown test', async ({page})=>{


   await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('#select-demo',{label:'Tuesday'});
    await page.waitForTimeout(3000);
    
})



test("Bootstrap dropdown", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    
    await selectCountry("India");
    await selectCountry("Denmark");
    await selectCountry("South Africa");
    // await page.waitForTimeout(3000)
 
    async function selectCountry(countryName) {
        await page.click("#country+span");
        await page.locator("ul#select2-country-results")
            .locator("li", {
                hasText: countryName
            }).click();
    }
})