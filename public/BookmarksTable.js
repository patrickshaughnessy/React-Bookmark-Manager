import React from 'react';
var moment = require('moment')

import keygen from './keygen';
import Caret from './Caret';
import Heart from './Heart';
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
      liked: []
    }
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
      console.log('inside generate - filters: ', this.state.sortFilters[i])
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

      return (
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
      )
    }
  }
}
