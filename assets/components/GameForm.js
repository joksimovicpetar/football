import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { renderField } from '../form';
import { gameAdd, hostSelected, clubListFetch } from '../actions/actions'
import Seelector from './Select';

const mapStateToProps = state => ({
    ...state.clubList
})
const mapDispatchToProps = {
    gameAdd,
    clubListFetch
}

class GameForm extends React.Component {
    constructor() {
        super();
        this.state = {
            selectValue: "react"
        };
        this.handleHostChange = this.handleHostChange.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);

        this.renderHost = this.renderHost.bind(this);
        this.renderGuest = this.renderGuest.bind(this);

    }
    onSubmit(values) {
        const { gameAdd, blogPostId, reset, clubListFetch } = this.props;

        const game = {date: values.date, host:this.state.selectHostValue, guest:this.state.selectGuestValue }
        return this.props.gameAdd(game).then(() => reset())
    }

    renderHost(field) {
        return (
            <div className="title-design">
                <label className="label-design">{field.label} </label>
                <select
                    name="host"
                    className="title-input"
                    onChange={this.handleHostChange}
                >
                    {this.props.clubs?.length && this.props.clubs.map(club => (
                        <option value={club.id} key={club.id}>{club.name}</option>
                    ))}
                </select>
            </div>
        );
    }

    renderGuest(field) {
        return (
            <div className="title-design">
                <label className="label-design">{field.label} </label>
                <select
                    name="guests"
                    className="title-input"
                    onChange={this.handleGuestChange}
                >
                    {this.props.clubs?.length && this.props.clubs.map(club => (
                        <option value={club.id} key={club.id}>{club.name}</option>
                    ))}
                </select>
            </div>
        );
    }

    componentDidMount() {
        this.props.clubListFetch();
    }

    handleHostChange(e) {
        const value = e.target.value;
        this.props.change("host", value);
        this.setState({ "selectHostValue": value }, () => {
        });
    }
    handleGuestChange(e) {
        const value = e.target.value;
        this.props.change("guest", value);
        this.setState({ "selectGuestValue": value }, () => {
        });
    }

    render() {
        const { handleSubmit, submitting, clubListFetch, clubs } = this.props;
        return (<div className="card mb-3 shadow-sm">
            <div className="card-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    {this.props.clubs && <Field label="Host" name="host" component={this.renderHost} />}
                    {this.props.clubs && <Field label="Guest" name="guest" component={this.renderGuest} />}

                    <Field name="date" label="Type your game" type="text" component={renderField} />

                    {/* <Field name="content" label="Type your game" type="textarea" component={renderField} /> */}
                    {/* <Field name="content" label="Type your game" type="textarea" component={renderField} /> */}

                    <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Add Game</button>
                </form>
  
            </div>
        </div>)
    }
}

export default reduxForm({
    form: 'GameForm'
})(connect(mapStateToProps, mapDispatchToProps)(GameForm))