
import React, { Component } from 'react'
import Select from 'react-select'
import { requests } from '../agent';


export default class Seelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      id: "",
      name: ''
    }
  }

 async getOptions(){
    const data = await  requests.get(`/${this.props.url}`, true)

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name

    }))
    this.setState({selectOptions: options})

  }

  handleChange(e){
    this.props.host(e.value)

  //  this.setState({id:e.value, name:e.label})
  }

  componentDidMount(){
      this.getOptions()
  }

  render() {
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
      </div>
    )
  }
}
