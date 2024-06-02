import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog.jsx';


test('Load blog component', async () => {

	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'Matti Luukkainen',
		url: 'https://reactpatterns.com/',
		likes: 7
	}

	const {container } =  render(<Blog blog={blog} />)

	screen.debug()
	const titleElement = screen.getByText(/Component testing is done with react-testing-library/i);
	const authorElement = screen.getByText(/Matti Luukkainen/i);

	expect(titleElement).toBeInTheDocument()
	expect(authorElement).toBeInTheDocument()


	const urlElement = screen.queryByText(/https:\/\/reactpatterns.com/i)
	const likesElement = screen.queryByText(/7/i)

	expect(urlElement).not.toBeInTheDocument()
	expect(likesElement).not.toBeInTheDocument()


	const div = container.querySelector('.titleAndAuthor');
	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library'
	)
})