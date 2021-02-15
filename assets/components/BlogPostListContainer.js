import React from 'react';
import BlogPostList from './BlogPostList';
import { blogPostListFetch } from '../actions/actions'
import { connect } from 'react-redux';
import  Spinner  from './Spinner';

const mapStateToProps = state => ({
    ...state.blogPostList
})

const mapDispatchToProps = {
    blogPostListFetch
}
class BlogPostListContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostListFetch();   
        console.log(this.props)
        console.log('kkd');

    }
    render() {
        console.log('rendering');
        const {posts, isFetching} = this.props;
       
        if (isFetching) {
            return (<Spinner/>)
        }

        return (
            <BlogPostList posts={posts}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer); 