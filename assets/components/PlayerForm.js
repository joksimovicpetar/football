import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { canWritePlayer } from "../apiUtils"
import { renderField } from '../form';
import { playerAdd, imageUpload, clubListFetch } from '../actions/actions'
import ImageUpload from './ImageUpload';

const mapDispatchToProps = {
    playerAdd,
    imageUpload,
    clubListFetch
}

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.clubList
})

class PlayerForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.handleCityChange = this.handleCityChange.bind(this);
        this.handleClubChange = this.handleClubChange.bind(this);

        // this.renderCity = this.renderCity.bind(this);
        this.renderClub = this.renderClub.bind(this);
    }

    onSubmit(values) {
        const { playerAdd, reset, history } = this.props;
        const { firstName, lastName, dateOfBirth, position, personalIdentifier} = values;
        console.log('image state', this.state.file);

        return playerAdd({ firstName, lastName, dateOfBirth, position, personalIdentifier, city:14,  club:Number(this.state.selectClubValue)    }, this.state.file)
        .then((response) => {
            console.log('response from add', response);
            // reset();
            // history.push('/')
        }).catch(error=>{
            console.log('EEROR', error);
        })
    }

    handleClubChange(e) {
        const value = e.target.value;
        this.props.change("club", value);
        this.setState({ "selectClubValue": value }, () => {
        });
    }
    // renderCity(field) {
    //     return (
    //         <div className="title-design">
    //             <label className="label-design">{field.label} </label>
    //             <select
    //                 name="city"
    //                 className="title-input"
    //                 onChange={this.handleCityChange}
    //             >
    //                 {this.props.cities?.length && this.props.cities.map(club => (
    //                     <option value={city.id} key={city.id}>{city.name}</option>
    //                 ))}
    //             </select>
    //         </div>
    //     );
    // }

    renderClub(field) {
        return (
            <div className="title-design">
                <label className="label-design">{field.label} </label>
                <select
                    name="club"
                    className="title-input"
                    onChange={this.handleClubChange}
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

    handleChange(e) {
        console.log('eee', e);
        const file = e[0];
        this.setState({
            file
        })
        // this.props.imageUpload(file);
        
    }
    render() {
        // if(!canWritePlayer(this.props.userData)){
        //     return <Redirect to = '/login'/>
        // }
        console.log('rendering', this.props);
        const { submitting, handleSubmit, error } = this.props;
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="firstName" label="Title:" type="text" component={renderField} />
                        <Field name="lastName" label="Title:" type="text" component={renderField} />
                        <Field name="dateOfBirth" label="Title:" type="text" component={renderField} />
                        <Field name="position" label="Title:" type="text" component={renderField} />
                        <Field name="personalIdentifier" label="Title:" type="text" component={renderField} />
                        {console.log('club', this.props.clubs)}
                        {this.props.clubs && <Field label="Club" name="club" component={this.renderClub} />}

                        {/* <Field name="content" label="Content:" type="textarea" component={renderField}/> */}
                        {/* <ImageUpload/> */}

                        <div className="form-group nice-input-upload">
                            <input type="file" className="form-control-file text-primary font-weight-bold"
                                data-title="Click me or drag and drop file"  onChange={ (e) => this.handleChange(e.target.files) }/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>Save Player</button>
                    </form>
                </div>


            </div>)
    }
}

export default reduxForm({
    form: 'PlayerForm'
})(connect(mapStateToProps, mapDispatchToProps)(PlayerForm))