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
    // let descending = !this.state.info.descending;
    // this.props.toggleSort(descending);
    // this.setState({descending: descending})
  }

  render(){
    return (
      <i onClick={this.handleClick.bind(this)} className="fa fa-trash-o"></i>
    )
  }
}
