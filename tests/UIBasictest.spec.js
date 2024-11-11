const { page,test, expect} =require('@playwright/test');

test('title confirmation test', async ({page})=>

 {

  await  page.goto("https://google.com");
  await  expect(page).toHaveTitle('Google');

});

test("random test", async ({page})=>{


  await page.goto("https://google.com");
})