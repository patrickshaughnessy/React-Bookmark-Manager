import React from 'react';
var moment = require('moment')

import keygen from './keygen';
import Caret from './Caret';
import Heart from './Heart';
import SearchBox from './SearchBox';
import OnlyLiked from './OnlyLiked';
import Trash from './Trash';

export default class extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      sortFilters: [
        {header: 'title', descending: true},
        {header: 'url', descending: true},
        {header: 'created', descending: true}
      ],
      sortIndex: 2,
      liked: [],
      onlyLiked: false,
      input: null,
      filter: false
    }
  }

  filterResults(input){
    console.log(input);
    let filter = input.length ? true : false
    this.setState({filter: filter, input: input});
  }

  toggleOnlyLiked(){
    let onlyLiked = !this.state.onlyLiked;
    this.setState({onlyLiked: onlyLiked})
  }

  deleteBookmark(i){
    this.props.deleteBookmark(i);
  }

  toggleLiked(index){
    let liked = this.state.liked;
    if (this.state.liked.indexOf(index) === -1){
      liked = liked.concat(index);
    } else {
      liked.splice(liked.indexOf(index), 1);
    }
    this.setState({liked: liked});
  }

  toggleSort(index, descending){
    let sortFilters = this.state.sortFilters;
    sortFilters[index].descending = descending;
    this.setState({sortFilters: sortFilters, sortIndex: index});
  }

  generateHeaders(bookmarks){
    return Object.keys(bookmarks[0]).map((header, i) => {
      header = header.charAt(0).toUpperCase() + header.slice(1);
      return <th key={keygen()}>
                {header} <Caret toggleSort={this.toggleSort.bind(this, i)}
                                info={this.state.sortFilters[i]} />
             </th>
    })
  }

  generateData(bookmarks){
    return bookmarks.map((row, i) => {
      var tr = [];
      for (var header in row){
        var data;
        switch (header){
          case 'title':
            data = row[header]
            break;
          case 'url':
            data = <a href={row[header]} target='_blank'>{row[header]}</a>
            break;
          case 'created':
            data = moment(row[header]).fromNow()
            break;
        }
        tr.push(<td key={keygen()}>{data}</td>);
      }
      let id = row.created;
      tr.push(
        <td key={keygen()}>
          <Heart toggleLiked={this.toggleLiked.bind(this, id)}
                 liked={this.state.liked.indexOf(id)} />
        </td>,
        <td key={keygen()}>
          <Trash deleteBookmark={this.deleteBookmark.bind(this, id)} />
        </td>)
      return (
        <tr key={keygen()}>{tr}</tr>
      )
    })
  }

  render(){
    if (!this.props.bookmarks.length){
      return (
        <h4 className="noBookmarks">... No bookmarks to display yet ...</h4>
      )
    } else {
      let sortIndex = this.state.sortIndex;
      let header = this.state.sortFilters[sortIndex].header
      let descending = this.state.sortFilters[sortIndex].descending
      let bookmarks = this.props.bookmarks.sort((a, b) => {
        if (descending){
          return a[header] < b[header]
        } else {
          return a[header] > b[header]
        }
      });

      if (this.state.onlyLiked){
        bookmarks = bookmarks.filter(bookmark => {
          return this.state.liked.indexOf(bookmark.created) > -1
        });
      }

      if (this.state.filter){
        bookmarks = bookmarks.filter(bookmark => {
          let input = new RegExp(this.state.input, 'gi');
          console.log('regex', input)
          return bookmark.title.match(input);
        })
      }

      if (!bookmarks.length) {
        return (
          <div>
            <SearchBox filterResults={this.filterResults.bind(this)}
                       input={this.state.input} />
            <OnlyLiked toggleOnlyLiked={this.toggleOnlyLiked.bind(this)}
                       checked={this.state.onlyLiked} />
            <h4 className="noBookmarks">... No bookmarks favorited ...</h4>
          </div>
        )
      }

      return (
        <div>
          <div>
            <SearchBox filterResults={this.filterResults.bind(this)}
                       input={this.state.input} />
            <OnlyLiked toggleOnlyLiked={this.toggleOnlyLiked.bind(this)}
                       checked={this.state.onlyLiked} />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {this.generateHeaders(bookmarks)}
                  <th>Likes</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.generateData(bookmarks)}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}
