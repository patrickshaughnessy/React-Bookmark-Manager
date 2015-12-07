import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: this.props.input
    }
  }

  updateInput(e){
    e.preventDefault();
    this.setState({input: e.target.value})
    this.props.filterResults(e.target.value);
  }

  render(){
    return (
      <div className="form-group">
        <label htmlFor="search">Search Bookmarks</label>
        <input value={this.state.input} onChange={this.updateInput.bind(this)} type="text" className="form-control" id="search" placeholder="Enter search terms" />
      </div>
    )
  }
}
