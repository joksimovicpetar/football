import React from 'react';
import {connect} from 'react-redux';
import {commentListFetch, commentListUnload} from '../actions/actions';
import BlogPost from './BlogPost';
import CommentList from './CommentList';
import  Spinner  from './Spinner';

const mapStateToProps = state => ({
    ...state.commentList
})

const mapDispatchToProps = {
    commentListFetch, commentListUnload
}
class CommentListContainer extends React.Component {
    componentDidMount() {
        console.log('tatatta', this.props.blogPostId)
        this.props.commentListFetch(this.props.blogPostId)
    }

    componentWillUnmount() {
        this.props.commentListUnload();
    }
    render() {
        console.log('invokeddd')
        const {isFetching, commentList} = this.props;
        if(isFetching) {
            return (<Spinner/>)
        }
        return (
            <CommentList commentList={commentList}></CommentList>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);