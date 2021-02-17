import React from 'react';
import { post } from 'superagent';
import Message from './Message'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import "./CommentList.css";
export default class CommentList extends React.Component {
    render() {
        const {commentList} = this.props;
        if(!commentList || !commentList.length) {
            return (<Message message="No comments yet"/>)
        }

        return (
            <div className="card mb-3 shadow-sm">
                <TransitionGroup>
                {commentList.map((comment=>{
                    return (
                        <CSSTransition  key={comment.id} timeout={500} classNames="fade">
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
                            </CSSTransition>
                    )
                }))}
                </TransitionGroup>
            </div>
        )
    }
}

