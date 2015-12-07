import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      info: this.props.info
    }
  }

  handleClick(e){
    e.preventDefault();
    let descending = !this.state.info.descending;
    this.props.toggleSort(descending);
    this.setState({descending: descending})
  }

  render(){
    console.log('inside caret', this.props.info)
    if (this.state.info.descending){
      return (
        <i onClick={this.handleClick.bind(this)} className="fa fa-caret-down"></i>
      )
    } else {
      return (
        <i onClick={this.handleClick.bind(this)} className="fa fa-caret-up"></i>
      )
    }
  }
}
