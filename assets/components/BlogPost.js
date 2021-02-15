import React from 'react';
import { post } from 'superagent';
import Message from './Message'

export default class BlogPost extends React.Component {
    componentDidMount() {
    }

    render() {
        const {post} = this.props;

        

        if(!post) {
            return (<Message message="Blod Post does not exist"/>)
        }

        return (
            <div className="card mb-3 shadow-sm" key={post.id}>
                        <div className="card-body">
                            <h2>
                                {post.name}

                            </h2>
                            <p className="card-text">{post.name}</p>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                    {post.name}

                                    {/* {timeago().format(post.published)} */}
                                </small>
                            </p>
                        </div>
                    </div>
        )
    }
}

