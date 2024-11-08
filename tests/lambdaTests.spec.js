const { page,test, expect} =require('@playwright/test');


test('single dropdown test', async ({page})=>{


   await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('#select-demo',{label:'Tuesday'});
    await page.waitForTimeout(3000);
    
})

test('multiseelct dropdown', async ({page})=>{


    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    
})