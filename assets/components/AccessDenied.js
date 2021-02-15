import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {renderField} from '../form';
import {connect} from 'react-redux'
import {userLoginAttempt} from '../actions/actions'


class AccessDenied extends React.Component {

    render() {
        return (
            <div className="text-center">
              Not Authorized To Access This Page
            </div>
        )
    }
}

export default AccessDenied