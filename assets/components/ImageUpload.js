import React from 'react';
import {connect} from 'react-redux';
import {imageUpload} from '../actions/actions'
import './ImageUpload.css';

const mapDispatchToProps = {
    imageUpload
}

class ImageUpload extends React.Component{
    onChange(e) {
        const file = e.target.files[0];
        this.props.imageUpload(file);
        
    }
    render() {
        return (
            <div className="form-group nice-input-upload">
                <input type="file" className="form-control-file text-primary font-weight-bold" 
                data-title="Click me or drag and drop file"/>
            </div>
        )
    }

}

export default connect(null, mapDispatchToProps)(ImageUpload)