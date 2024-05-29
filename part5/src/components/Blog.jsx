import {useState} from "react";

const Blog = ({blog, name}) => {


    const [isShown, setIsShown] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column'
    }


    return (
        <div style={blogStyle}>
            <div>
                {blog.title} ---- {blog.author}
                <button onClick={() => setIsShown(!isShown)}>{isShown ? 'hide' : 'show'}</button>
            </div>
            {isShown &&(<div>
                {blog.url}
                <br/>
                {blog.likes}
                <button>like</button>
                <br/>
                {name}
            </div>)}
        </div>
    )
}

export default Blog