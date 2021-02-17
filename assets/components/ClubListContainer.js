import React from 'react';
import ClubList from './ClubList';
import { clubListFetch, clubListSetPage } from '../actions/actions'
import { connect } from 'react-redux';
import  Spinner  from './Spinner';
import  {Paginator}  from './Paginator';

const mapStateToProps = state => ({
    ...state.clubList
})

const mapDispatchToProps = {
    clubListFetch,
    clubListSetPage
}

class ClubListContainer extends React.Component {
    componentDidMount() {
        this.props.clubListFetch(this.getQueryParamPage());   
    }

    componentDidUpdate(prevProps) {
        const {currentPage, clubListFetch, clubListSetPage} = this.props;

        if(prevProps.match.params.page !== this.getQueryParamPage()) {
            clubListSetPage(this.getQueryParamPage())
        }

        if(prevProps.currentPage !== currentPage) {
            clubListFetch(currentPage)
        }
    }

getQueryParamPage () {
    return Number(this.props.match.params.page) || 1
}

changePage(page) {
    const {history, clubListSetPage} = this.props;
    clubListSetPage(page);
    history.push(`/${page}`)
}

    render() {
        const {clubs, isFetching, currentPage} = this.props;
       
        if (isFetching) {
            return (<Spinner/>)
        }

        return (
            <div>
            <ClubList clubs={clubs}/>
            <Paginator currentPage={currentPage} pageCount={10} setPage={this.changePage.bind(this)}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubListContainer); 