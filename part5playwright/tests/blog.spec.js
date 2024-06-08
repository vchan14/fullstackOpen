const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require("./helper");

describe('Blog home page ', () => {
    beforeEach(async ({ page }) => {
        await page.goto('')
    })

    test('Login form is shown', async ({ page }) => {
        const usernameEle = await page.getByText('username');
        const passwordEle = await page.getByText('password');

        await expect(usernameEle).toBeVisible();
        await expect(passwordEle).toBeVisible();
    })

})

describe('Login and logout ', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'test',
                password: 'test'
            }
        })
        await page.goto('')
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
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'test',
                password: 'test'
            }
        })
        await page.goto('')
        await loginWith(page, 'test', 'test');
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test.com');
        await expect(page.locator('#root')).toContainText('test title - test authorshow');
    })

    test('user can like a blog', async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test.com');
        await page.getByRole('button', { name: 'show' }).click();
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('test.com1likeMatti')).toBeVisible();
        // like again
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('test.com2likeMatti')).toBeVisible();
    })

    test.only('user can delete their blog', async ({ page }) => {
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await createBlog(page, 'test title 1', 'test author 1', 'test1.com');
        await createBlog(page, 'test title 2', 'test author 2', 'test2.com');

        await expect(page.getByText('test title 1 - test author')).toBeVisible()
        await expect(page.getByText('test title 2 - test author')).toBeVisible()

        const otherBlog = await page.getByText('test title 2 - test author')
        await otherBlog.getByRole('button', { name: 'show' }).click();
        await page.pause();

        await page.getByRole('button', { name: 'remove' }).click();
        await expect(otherBlog.getByText('test title 2 - test author')).not.toBeVisible()

    })
})