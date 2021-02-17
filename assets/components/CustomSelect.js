import React, {Component} from 'react';
import Select from 'react-select';
import {FormGroup} from "reactstrap";


class CustomSelect extends Component {

 render() {
   const {meta: {touched, error}} = this.props;
   const className = ` form-group mb-3 ${touched && error ? 'has-danger' : '' }`;
   return (    
        <FormGroup>
                <Select
                      {...this.props}
                       value={this.props.input.value}
                       onChange={(value) => this.props.input.onChange(value)}
                       onBlur={() => this.props.input.onBlur(this.props.input.value)}
                       options={this.props.options}
                       placeholder={this.props.placeholder}
                    />
                    <div className={className}>
                         <div className="text-help">
                              {touched ? error : ''}
                          </div>
                     </div>
           </FormGroup>

            );