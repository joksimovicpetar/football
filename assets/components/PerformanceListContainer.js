import React from 'react';
import {connect} from 'react-redux';
import {performanceListFetch, performanceListUnload} from '../actions/actions';
import BlogPost from './BlogPost';
import PerformanceForm from './PerformanceForm';

import PerformanceList from './PerformanceList';
import  Spinner  from './Spinner';

const mapStateToProps = state => ({
    ...state.performanceList,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    performanceListFetch, performanceListUnload
}
class PerformanceListContainer extends React.Component {
    componentDidMount() {
        this.props.performanceListFetch(this.props.blogPostId)
    }

    componentWillUnmount() {
        this.props.performanceListUnload();
    }
    render() {
        const {isFetching, performanceList, isAuthenticated, blogPostId} = this.props;
        if(isFetching) {
            return (<Spinner/>)
        }
        return (
            <div>
<PerformanceList performanceList={performanceList}></PerformanceList>
            {isAuthenticated && <PerformanceForm blogPostId= {blogPostId}/>}
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceListContainer);