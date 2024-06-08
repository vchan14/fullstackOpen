const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith} = require("./helper");

describe('Blog home page ', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const usernameEle = await page.getByText('username');
        const passwordEle = await page.getByText('password');

        await expect(usernameEle).toBeVisible();
        await expect(passwordEle).toBeVisible();
    })

})


describe('Login and logout ', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })


    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'test', 'test');
        const logoutButton = await page.getByRole('button', {name: 'logout'});
        await expect(logoutButton).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'test', 'wrong');
        await expect(page.getByText('wrong credentials')).toBeVisible();
    })
})

describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
        await loginWith(page, 'test', 'test');
    })

    test.only('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click();
        await page.getByPlaceholder('enter title').fill('test title');
        await page.getByPlaceholder('enter author').fill('test author');
        await page.getByPlaceholder('enter url').fill('test.com');
        await page.getByRole('button', { name: 'create' }).click();
        await expect(page.locator('#root')).toContainText('test title - test authorshow');
    })
})