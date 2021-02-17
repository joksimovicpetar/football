import React from 'react';
import CompetitionList from './CompetitionList';
import { competitionListFetch, competitionListSetPage } from '../actions/actions'
import { connect } from 'react-redux';
import  Spinner  from './Spinner';
import  {Paginator}  from './Paginator';
import CompetitionForm from './CompetitionForm';
const mapStateToProps = state => ({
    ...state.competitionList,
    isAuthenticated: state.auth.isAuthenticated

})

const mapDispatchToProps = {
    competitionListFetch,
    competitionListSetPage
}
class CompetitionListContainer extends React.Component {
    componentDidMount() {
        this.props.competitionListFetch(this.getQueryParamPage());   

    }

    componentDidUpdate(prevProps) {
        const {currentPage, competitionListFetch, competitionListSetPage} = this.props;

        if(prevProps.match.params.page !== this.getQueryParamPage()) {
            competitionListSetPage(this.getQueryParamPage())
        }

        if(prevProps.currentPage !== currentPage) {
            competitionListFetch(currentPage)
        }
    }

getQueryParamPage () {
    return Number(this.props.match.params.page) || 1
}

changePage(page) {
    const {history, competitionListSetPage} = this.props;
    competitionListSetPage(page);
    history.push(`/${page}`)
}
    render() {
        const {competitions, isFetching,  currentPage, isAuthenticated } = this.props;
        const displayForm = this.props.displayForm === undefined ? true : this.props.displayForm

        if (isFetching) {
            return (<Spinner/>)
        }

        return (
            <div>
            <CompetitionList competitions={competitions}/>
            <Paginator currentPage={currentPage} pageCount={10} setPage={this.changePage.bind(this)}/>
            {isAuthenticated && displayForm && <CompetitionForm/>}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionListContainer); 