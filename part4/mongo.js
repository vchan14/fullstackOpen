const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://blog_user:${password}@fullstackopen.owevcjl.mongodb.net/?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
    })

    const Blog = mongoose.model('Blog', blogSchema)

    Blog.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
})