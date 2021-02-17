import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { renderField } from '../form';
import { competitionAdd } from '../actions/actions'
import { initialize } from 'redux-form';

const mapDispatchToProps = {
    competitionAdd,
    initialValues: {
        name: "name"
    }
}

const mapStateToProps = state => ({
    userData: state.auth.userData,
})

class CompetitionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'random text'
        }
    }
    componentWillMount() {
        const { competition } = this.props;
        this.props.initialize({ name: competition?.name, description: competition?.description });
        this.props.dispatch(initialize('contact', {
            name: 'test'
        }, ['name', 'address', 'phone']));
    }

    onSubmit(values) {
        const { competitionAdd, reset, history } = this.props;
        return competitionAdd({ id: this.props?.competition?.id, name: values.name, description: values.description }).then(() => {
            reset();
            history.push('/')
        })
    }
    handleChange(e) {
    }

    handleClick() {
        this.setState({ value: 'another random text' })
        var event = new Event('input', { bubbles: true });
        this.myinput.dispatchEvent(event);
    }

    render() {
        const { submitting, handleSubmit, error, competition } = this.props;
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field value={this.props} name="name" label="Name:" type="text" component={renderField} />
                        <Field name="description" label="Description:" type="textarea" component={renderField} />
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Save</button>
                    </form>
                </div>
            </div>)
    }
}

export default reduxForm({
    form: 'CompetitionForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(connect(null, mapDispatchToProps)(CompetitionForm))