const { page,test, expect} =require('@playwright/test');


test('First playwright test', async ({browser,page})=>
{

await page.goto("https://google.com");



});


test('title confirmation test', async ({page})=>

 {

  await  page.goto("https://google.com");
  await  expect(page).toHaveTitle('Google');

});