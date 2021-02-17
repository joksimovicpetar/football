import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { canWriteCompetition } from "../apiUtils"
import { renderField } from '../form';
import { competitionAdd } from '../actions/actions'
import ImageUpload from './ImageUpload';
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
        const {competition} = this.props;
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
    handleChange (e) {
      }
      handleClick () {
        this.setState({value: 'another random text'})
        var event = new Event('input', { bubbles: true });
        this.myinput.dispatchEvent(event);
      }

    render() {
        // if(!canWriteCompetition(this.props.userData)){
        //     return <Redirect to = '/login'/>
        // }

        const { submitting, handleSubmit, error, competition } = this.props;
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        {/* <label>Name:</label>
                        <input className="form-control" name="name" type="text" label="Name:"  defaultValue={"tststst"} onChange={(e) => {this.handleChange(e)}} />  
                  
                        <br></br>

                        <label>Description:</label>
                        <input className="form-control" name="description" type="text" value={"tstfffstst"}/>  
                  
                        <br></br> */}
                        <Field value={this.props} name="name" label="Name:" type="text" component={renderField} />
                        <Field name="description" label="Description:" type="textarea" component={renderField} />
                        {/* <ImageUpload/> */}
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Save</button>
                    </form>
                </div>


            </div>)
    }
}

// CompetitionForm = reduxForm({
//     form: 'initializeFromState' // a unique identifier for this form
//   })(InitializeFromStateForm)

//   // You have to connect() to any reducers that you wish to connect to yourself
//   InitializeFromStateForm = connect(
//     state => ({
//       initialValues: state.account.data // pull initial values from account reducer
//     }),
//     // { load: loadAccount } // bind account loading action creator
//   )(InitializeFromStateForm)

//   export default InitializeFromStateForm

export default reduxForm({
    form: 'CompetitionForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(connect(null, mapDispatchToProps)(CompetitionForm))