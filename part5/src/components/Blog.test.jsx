import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog.jsx'
import userEvent from '@testing-library/user-event'


test('Load blog component', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  const { container } =  render(<Blog blog={blog} />)

  // screen.debug()
  const titleElement = screen.getByText(/Component testing is done with react-testing-library/i)
  const authorElement = screen.getByText(/Matti Luukkainen/i)

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()


  const urlElement = screen.queryByText(/https:\/\/reactpatterns.com/i)
  const likesElement = screen.queryByText(/7/i)

  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()


  const div = container.querySelector('.titleAndAuthor')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('Show URL and likes when show button is clicked', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  const { container } = render(<Blog blog={blog} name='test'/>)
  // screen.debug()
  const showButton = screen.getByText('show')
  const user = userEvent.setup()
  await user.click(showButton)


  const urlElement = screen.getByText(/https:\/\/reactpatterns.com/i)
  const likesElement = screen.getByText(/7/i)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})


/**
 *
 * Make a test, which ensures that if the like button is clicked twice,
 * the event handler the component received as props is called twice.
 */

test.only('Like button is clicked twice', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luukkainen',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  const handleIncreaseLikes = vi.fn()
  render(<Blog blog={blog} handleIncreaseLikes={handleIncreaseLikes} name='test'/>)

  // show the blog details and like counts
  const shownButton = screen.getByText('show')
  const user = userEvent.setup()
  await user.click(shownButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleIncreaseLikes).toHaveBeenCalledTimes(2)
})



