const loginWith = async (page, username, password)  => {
    await page.locator('input[name="Username"]').fill(username)
    await page.locator('input[name="Password"]').fill(password);
    await page.getByRole('button', { name: 'login' }).click();
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click();
    await page.getByPlaceholder('enter title').fill(title);
    await page.getByPlaceholder('enter author').fill(author);
    await page.getByPlaceholder('enter url').fill(url);
    await page.getByRole('button', { name: 'create' }).click();
}

export  {
    loginWith,
    createBlog
}