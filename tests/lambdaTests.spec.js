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


test.only('tab handling', async ({page})=> {

page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
page.pause();

const [newWindow] =await Promise.all([
page.waitForEvent('popup'),
page.locator("a[title='Follow @Lambdatesting on Twitter']").click()
]);
await newWindow.waitForLoadState('domcontentloaded');
console.log(await newWindow.title());
console.log(await newWindow.url());
})

test('window handling',async ({page})=>{
    page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');

})