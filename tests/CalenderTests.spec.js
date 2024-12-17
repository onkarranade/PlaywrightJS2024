const { test, expect} =require('@playwright/test');

test('calender test', async  ({page})=> {

const monthNumber='6';
const date='15';
const year='2027';
const expectedList=[monthNumber,date,year];


await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
await page.locator('.react-date-picker__inputGroup').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
await page.getByText(year).click();
await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();
let inputs=await page.locator('.react-date-picker__inputGroup input:visible');
const counts=await inputs.count();
console.log(await inputs.count());
for(let i=0; i<counts;i++)
{
   // const value = await inputs.nth(i).evaluate((el) => el.value);
    const value=await inputs.nth(i).getAttribute('value');
    console.log(value);
    expect(value).toEqual(expectedList[i]);
}
})

test('popup validations', async ({page})=> 
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

})