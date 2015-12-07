import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props);
  }

  handleChange(e){
    this.props.toggleOnlyLiked();
  }

  render(){
    return (
      <div className="checkbox">
        <label>
          <input onChange={this.handleChange.bind(this)} checked={this.props.checked} type="checkbox" /> Only display liked bookmarks
        </label>
      </div>
    )
  }
}
