const { page,test, expect} =require('@playwright/test');


test('single dropdown test', async ({page})=>{


   await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    await page.selectOption('#select-demo',{label:'Tuesday'});
    await page.waitForTimeout(3000);
    
})

test('multiseelct dropdown', async ({page})=>{


    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
   // const overlay = page.locator('.overlay'); // Use the correct selector if needed
    //await overlay.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {}); // Wait for it to disappear
    const multiselect= page.locator('#multi-select');
    await multiselect.selectOption(['Florida','Ohio']);
    await page.waitForLoadState('domcontentloaded');
    await page.pause();
    const printMeButton = page.locator('#printMe');
    await page.waitForLoadState('domcontentloaded');
    await expect(printMeButton).toBeVisible();
    //await printMeButton.click();
    await printMeButton.click({ force: true });

    await page.waitForFunction(() => {
        const firstSelectedText = document.querySelector('p#firstSelectedOption');
        return firstSelectedText && firstSelectedText.innerText.includes('Florida');
    });
    const firstSelectedOptionText = await page.locator('p#firstSelectedOption').innerText();
    expect(firstSelectedOptionText).toContain('Florida');
   // await page.locator("p:has-text('First selected option is :')").waitFor();
    //await page.locator("p:has-text('First selected option is : Florida')").waitFor({ state: 'visible' });
   

  //  await page.pause();
   // const firstSelectedOptionText = await page.locator("p:has-text('First selected option is :')").innerText();
  //  expect(firstSelectedOptionText).toContain('Florida');
   
    
    
    
})

test('multi-select dropdowns', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');

    // Select multiple options from the dropdown
    const multiselect = page.locator('#multi-select');
    await multiselect.selectOption(['Florida', 'Ohio']);

    // Pause to observe the state manually
    await page.pause();

    // Ensure no overlays or loading elements are blocking the button
    const overlay = page.locator('.overlay'); // Adjust selector if needed
    await overlay.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {}); // Wait for overlay to disappear

    // Check if the #printMe button exists before clicking it
    const printMeButton = page.locator('#printMe');
    await expect(printMeButton).toBeVisible();

    // Try clicking the button
    await printMeButton.click({ force: true });

    // Log text before click
    const printMeButtonTextBefore = await printMeButton.innerText();
    console.log('Before click:', printMeButtonTextBefore);

    // Wait for the first selected option text to be visible
    await page.waitForSelector('p#firstSelectedOption', { state: 'visible' });

    // Retrieve and verify the updated text
    const firstSelectedOptionText = await page.locator('p#firstSelectedOption').innerText();
    console.log('First Selected Option Text:', firstSelectedOptionText);  // Debug the output
    expect(firstSelectedOptionText).toContain('Florida');

    // Retrieve the last selected option text
    const lastSelectedOptionText = await page.locator('p#printMe').innerText();
    console.log('Last Selected Option Text:', lastSelectedOptionText);  // Debug the output
    expect(lastSelectedOptionText).toContain('New York');
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