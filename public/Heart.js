import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props);
  }

  handleClick(e){
    e.preventDefault();
    this.props.toggleLiked();
  }

  render(){
    if (this.props.liked === -1){
      return (
        <i onClick={this.handleClick.bind(this)} className="fa fa-heart-o"></i>
      )
    } else {
      return (
        <i onClick={this.handleClick.bind(this)} className="fa fa-heart"></i>
      )
    }
  }
}
