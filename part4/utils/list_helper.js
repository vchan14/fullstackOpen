const _ = require('lodash');

const dummy = (blogs) => {
    // ...
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    let currMax = 0;
    let maxIndex = -1;
    blogs.forEach((blog, i) => {
        if (blog.likes >= currMax) {
            currMax = blog.likes
            maxIndex = i
        }
    })
    if (maxIndex === -1) {
        return null
    }
    const {title, author, likes} = blogs[maxIndex]

    return {title, author, likes}
}

const mostBlogs = (blogs) => {
    const blogByAuthor = _.groupBy(blogs, blog => blog.author);

    const blogCounts = _.mapValues(blogByAuthor, blog => blog.length);

    const authorWithMostBlogs = _.maxBy(Object.keys(blogCounts), key => blogCounts[key]);
    const numberOfBlogs = blogCounts[authorWithMostBlogs];

    return {author: authorWithMostBlogs, blogs: numberOfBlogs}


}

const mostLikes = (blogs) => {
    const authorToLikes = new Map();
    blogs.forEach(({author, likes}) => {
        const currLikes = authorToLikes.get(author) || 0;
        authorToLikes.set(author, currLikes + likes);
    });
    let mostLikes = -1;
    let authorWithMostLikes = '';

    for (const [author, likes] of authorToLikes) {
        if (likes > mostLikes) {
            mostLikes = likes;
            authorWithMostLikes = author;
        }
    }

    if (mostLikes === -1) {
        return null;
    }
    return {
        author : authorWithMostLikes,
        likes: mostLikes
    }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}