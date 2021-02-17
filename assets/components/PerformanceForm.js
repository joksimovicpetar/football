import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { render } from 'react-dom';
import { renderField } from '../form';
import { performanceAdd } from '../actions/actions'

const mapDispatchToProps = {
    performanceAdd
}

class PerformanceForm extends React.Component{
    onSubmit(values) {
        const {performanceAdd, blogPostId, reset} = this.props;
        return this.props.performanceAdd(values.player, values.game, values.playerPerformance).then(()=>reset())
    }
    render() {
        const {handleSubmit, submitting} = this.props;
        return(<div className="card mb-3 shadow-sm">
            <div className="card-body">
                <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                    <Field name = "player" label="Enter Player Id" type="text" component={renderField}/>
                    <Field name = "game" label="Enter Game Id" type="text" component={renderField}/>
                    <Field name = "playerPerformance" label="Type your performance" type="text" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Add Performance</button>
                </form>
            </div>
        </div>)
    }
}

export default reduxForm({
    form: 'PerformanceForm'
})(connect(null, mapDispatchToProps)(PerformanceForm))