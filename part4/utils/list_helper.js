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



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}