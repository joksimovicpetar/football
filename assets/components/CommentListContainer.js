import React from 'react';
import {connect} from 'react-redux';
import {commentListFetch, commentListUnload} from '../actions/actions';
import BlogPost from './BlogPost';
import CommentForm from './CommentForm';

import CommentList from './CommentList';
import  Spinner  from './Spinner';

const mapStateToProps = state => ({
    ...state.commentList,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
})

const mapDispatchToProps = {
    commentListFetch, commentListUnload
}

class CommentListContainer extends React.Component {
    componentDidMount() {
        this.props.commentListFetch(this.props.blogPostId)
    }

    componentWillUnmount() {
        this.props.commentListUnload();
    }
    render() {
        const {isFetching, commentList, isAuthenticated, blogPostId, isAdmin} = this.props;
        if(isFetching) {
            return (<Spinner/>)
        }
        return (
            <div>
<CommentList commentList={commentList}></CommentList>
            {isAuthenticated && isAdmin && <CommentForm blogPostId= {blogPostId}/>}
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);