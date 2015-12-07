import React from 'react';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: null,
      url: null
    }
  }

  changeTitle(e){
    this.setState({title: e.target.value})
  }

  changeUrl(e){
    this.setState({url: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
    this.setState({title: null, url: null});
  }

  render(){
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input value={this.state.title} onChange={this.changeTitle.bind(this)} type="text" className="form-control" id="title" placeholder="Enter a title" required />
        </div>
        <div className="form-group">
          <label htmlFor="url">Url</label>
          <div className="input-group">
            <div className="input-group-addon">http&#58;&#47;&#47;</div>
            <input value={this.state.url} onChange={this.changeUrl.bind(this)} type="text" className="form-control" id="url" placeholder="Enter the url" required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add bookmark</button>
      </form>
    )
  }
}
