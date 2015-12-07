import React from 'react';
import BookmarksTable from './BookmarksTable'
import AddBookmarkForm from './AddBookmarkForm'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookmarks: [
        {title: 'Google', url: 'http://google.com', created: 1449452179846},
        {title: 'Facebook', url: 'http://facebook.com', created: 1449453969642}
      ]
    }
  }

  addBookmark(newBookmark){
    newBookmark.created = Date.now();
    newBookmark.url = `http://${newBookmark.url}`
    let bookmarks = this.state.bookmarks;
    bookmarks.unshift(newBookmark);
    this.setState({bookmarks: bookmarks});
  }

  // sortBy(direction, id){
  //   console.log('inside app sort', direction, id)
  //   let bookmarks = this.state.bookmarks.sort((a, b) => {
  //     return a[id] > b[id]
  //   });
  //   this.setState({
  //     bookmarks: bookmarks,
  //     sortBy: {key: id, direction: direction}
  //   });
  //   return  this.state.sortBy
  // }

  render(){
    return(
      <div className='row'>
        <div className="col-xs-4 col-xs-offset-4">
          <AddBookmarkForm action={this.addBookmark.bind(this)} />
        </div>
        <div className="col-xs-12">
          <BookmarksTable bookmarks={this.state.bookmarks} />
        </div>
      </div>
    )
  }
}
