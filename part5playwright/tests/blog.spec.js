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
                name: 'qa_user',
                username: 'qa_user',
                password: 'qa_user'
            }
        })
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

    test('user can delete their blog', async ({ page }) => {
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

    test('blogs are ordered by likes', async ({ page }) => {
        // log out
        await createBlog(page, 'test title', 'test author', 'test.com');
        await page.getByRole('button', { name: 'logout' }).click();
        await loginWith(page, 'qa_user', 'qa_user');
        await createBlog(page, 'qa title', 'qa author', 'qa.com');

        await page.pause();
        await expect(page.getByText('test title - test author')).toBeVisible();
        await expect(page.getByText('qa title - qa author')).toBeVisible();

        const firstBlog = await page.getByText('test title - test authorshow');
        await firstBlog.getByRole('button', {name: 'show'}).click();

        const secondBlog = await page.getByText('qa title - qa authorshow')
        await secondBlog.getByRole('button', {name: 'show'}).click();

        const firstBlogDetails = await page.getByText('test title - test authorhidetest.com0likeMatti Luukkainen');

        await page.pause();
        await expect(firstBlogDetails.getByRole('button', {name: 'remove'})).not.toBeVisible();

        const secondBlogDetails = await page.getByText('qa title - qa authorhideqa.');
        await expect(secondBlogDetails.getByRole('button', {name: 'remove'})).toBeVisible();

    })

    test('More like blogs are shown first', async ({ page }) => {
        await createBlog(page, 'test title 1', 'test author 1', 'test1.com');
        await createBlog(page, 'test title 2', 'test author 2', 'test2.com');
        await createBlog(page, 'test title 3', 'test author 3', 'test3.com');

        const firstBlog = await page.getByText('test title 1 - test author 1show');
        await firstBlog.getByRole('button', {name: 'show'}).click();

        const secondBlog = await page.getByText('test title 2 - test author 2show');
        await secondBlog.getByRole('button', {name: 'show'}).click();

        const thirdBlog = await page.getByText('test title 3 - test author 3show');
        await thirdBlog.getByRole('button', {name: 'show'}).click();

        await page.pause();
        const allBlogs = await page.locator('.blog-element');
        const firstBlogDetails = allBlogs.nth(0)
        const secondBlogDetails = allBlogs.nth(1)
        const thirdBlogDetails = allBlogs.nth(2)

        for(const i of [1]) {
            await firstBlogDetails.getByRole('button', {name: 'like'}).click();
        }

        for(const i of [1, 2]) {
            await secondBlogDetails.getByRole('button', {name: 'like'}).click();
        }

        for(const i of [1, 2, 3]) {
            await thirdBlogDetails.getByRole('button', {name: 'like'}).click();
        }

        await page.waitForTimeout(500); // waits for 500 milliseconds

        const likeElements = await page.locator('.like-element');

        const likeArr = [];
        for (let i =0; i< 3; i++) {
            const like = await likeElements.nth(i)
            const likeNumber = await like.textContent();
            console.log('i', i);
            console.log('like', likeNumber);
            likeArr.push(likeNumber);
        }

        expect(JSON.stringify(likeArr)).toEqual(JSON.stringify(['3', '2', '1']));
        await expect(allBlogs).toHaveCount(3);
    })

})