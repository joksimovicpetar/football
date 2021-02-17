
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import { Redirect } from 'react-router';
import { canWriteBlogPost } from "../apiUtils"
import {renderField} from '../form';
import {blogPostAdd} from '../actions/actions'
import  ImageUpload  from './ImageUpload';

const mapDispatchToProps = {
    blogPostAdd
}

const mapStateToProps = state => ({
    userData: state.auth.userData,
})

class Selector extends React.Component {
    contructor(props) {
      super(props)
      this.state = { obj: null }
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(e) {
      this.setState({obj: e.target.value})
    }
  
    render() {
      <select onChange={handleChange}>
       {this.props.listOption.map((option, index) => 
         <option key={index} value={option.obj}>
           {option.name}
         </option>
       )}
      </select>
    }
  }