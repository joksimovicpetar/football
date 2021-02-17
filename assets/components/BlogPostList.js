import React from 'react';
import { Link } from 'react-router-dom';
import timeago from 'timeago.js'
import Message from './Message'
import  Spinner  from './Spinner';

class BlogPostList extends React.Component {

    render() {
        const { posts } = this.props;

        
        if (!posts?.length) {
            return (<Message message= "Blog Posts not found"/>)
        }
        return (
            <div>
                {posts && posts.map(post => (
                    <div className="card mb-3 shadow-sm" key={post.id}>
                        <div className="card-body">
                            <h3>
                                <Link to={`/blog-post/${post.id}`}>{post.name}</Link>

                            </h3>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                    {post.name}

                                    {/* {timeago().format(post.published)} */}
                                </small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default BlogPostList