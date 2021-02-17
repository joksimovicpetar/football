import React from 'react';
import CompetitionList from './CompetitionList';
import { competitionListFetch, competitionListSetPage, competitionsSort } from '../actions/actions'
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Paginator } from './Paginator';
import CompetitionForm from './CompetitionForm';

const mapStateToProps = state => ({
    ...state.competitionList,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
})

const mapDispatchToProps = {
    competitionListFetch,
    competitionListSetPage,
    competitionsSort
}

class CompetitionListContainer extends React.Component {
    componentDidMount() {
        this.props.competitionListFetch(this.getQueryParamPage());
    }

    componentDidUpdate(prevProps) {
        const { currentPage, competitionListFetch, competitionListSetPage } = this.props;

        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            competitionListSetPage(this.getQueryParamPage())
        }

        if (prevProps.currentPage !== currentPage) {
            competitionListFetch(currentPage)
        }
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1
    }

    changePage(page) {
        const { history, competitionListSetPage } = this.props;
        competitionListSetPage(page);
        history.push(`/${page}`)
    }

    render() {
        const { competitions, isFetching, currentPage, isAuthenticated, isAdmin } = this.props;
        const displayForm = this.props.displayForm === undefined ? true : this.props.displayForm
        console.log('comp is ad', isAdmin);

        if (isFetching) {
            return (<Spinner />)
        }

        return (
            <div>
                <div className="card mb-3 shadow-sm" >
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm"><button className="btn btn-secondary btn-lg"
                                    onClick={() => {
                                        this.props.competitionsSort(competitions, true)
                                    }} style={{ width: "100%" }}>Sort Ascending</button>
                                </div>
                                <div className="col-sm"><button className="btn btn-secondary btn-lg"
                                    onClick={() => {
                                        this.props.competitionsSort(competitions, false)
                                    }} style={{ width: "100%" }}>Sort Descending</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <CompetitionList competitions={competitions} isAuthenticated={isAuthenticated}/>
                <Paginator currentPage={currentPage} pageCount={10} setPage={this.changePage.bind(this)} />
                {isAuthenticated && displayForm && isAdmin && <CompetitionForm />}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionListContainer); 