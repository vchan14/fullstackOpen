


/**
 * Make a test for the new blog form. The test should check, that the form calls
 * the event handler it received as props with the right details when a new blog is created.
 */

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm.jsx'

test('Blog form is submitted with the right details', async () => {
  const handleAddForm = vi.fn()
  render(<BlogForm handleAddForm={handleAddForm} />)
  const user = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  const createButton = screen.getByText('create')
  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')
  await user.click(createButton)
  expect(handleAddForm).toHaveBeenCalledTimes(1)
  expect(handleAddForm.mock.calls[0][0].title).toBe('test title')
  expect(handleAddForm.mock.calls[0][0].author).toBe('test author')
  expect(handleAddForm.mock.calls[0][0].url).toBe('test url')
})



