import React from 'react';
import { post } from 'superagent';
import Message from './Message'

export default class CommentList extends React.Component {
    render() {
        const {commentList} = this.props;
        console.log('commentLo', commentList);
        if(!commentList) {
            return (<Message message="No comments yet"/>)
        }

        return (
            <div className="card mb-3 shadow-sm">
                {commentList.map((comment=>{
                    return (
                        <div className="card-body border-bottom" key={comment.id}>
                            <p className="card-text mb-0">
                               {comment.name} 
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {comment.name}
                                </small>
                            </p>
                            </div>
                    )
                }))}
            </div>
        )
    }
}

