import React from 'react';
import ReactDOM from 'react-dom'
import './default.css';

import { Window } from '../../ui'
import { fontdb }  from '../../util'

import FontListView from '../FontListView'
import DirectoryManager from '../DirectoryManager'

class FontManager extends Window {

  constructor (props) {
    super(props);

    this.state = { 
      files : [], 
    }

    this.init();

  }

  init = () => {

    fontdb.initFontDirectory(() => {
      this.search();
    })

  }


  refreshFiles = (files) => {
    this.refs.fontlistview.refreshFiles(files);
  }

  searchFont = (e) => {
    this.search();
  }

  showSearchFilter = () => {
    this.refs.searchFilter.classList.toggle('open');
  }

  showDirectory = () => {
    this.refs.directory.classList.toggle('open');
  }  

  toggleCheckBox = (e) => {
    let $icon = e.target.querySelector('i.material-icons');

    if ($icon.textContent === 'check_box') {
      $icon.textContent = "check_box_outline_blank";
    } else {
      $icon.textContent = "check_box";
    }
  }

  isChecked = ($el) => {
    return ReactDOM.findDOMNode($el).querySelector(".material-icons").textContent === 'check_box';
  }

  search = (filterOptions) => {

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      const tempFilter = filterOptions || {
        googleFontSearch : {
          category : {
            serif : this.isChecked(this.refs.serif),
            sanserif : this.isChecked(this.refs.sansserif),
            display : this.isChecked(this.refs.display),
            handwriting : this.isChecked(this.refs.handwriting),
            monospace : this.isChecked(this.refs.monospace),
          },
          weight : this.isChecked(this.refs.fontWeight) ? (this.refs.thickness.value * 100) : 0,
        },
        text : this.refs.searchText.value 
      }
  
      fontdb.searchFiles(tempFilter, (files) => {
        this.refreshFiles(files);
      })
    }, 100);

  }

  toggleFavoriteList = (e) => {
    const $dom = e.target;
    $dom.classList.toggle('active');

    if ($dom.classList.contains('active')) {
      this.search({favorite: true});
    } else {
      this.search();
    }

  }

  render() {
    return ( 
        <div className="window fontmanager-window font-manager" id={this.props.id}>
          <div className="app-menu">
            <div className="left">
              <span className="search-icon" onClick={this.showSearchFilter}><i className="material-icons">spellcheck</i></span>              
              <div className="search-input">
                <input type="search" ref="searchText" onKeyUp={this.searchFont} onClick={this.searchFont} placeholder="Search" />
              </div>
            </div>
            <div className="right tools">
              <span onClick={this.toggleFavoriteList}><i className="material-icons">favorite</i></span>              
              <span onClick={this.showDirectory}><i className="material-icons">folder_special</i></span>
            </div>
          </div>
          <div ref="searchFilter" className="app-search-filter" onMouseUp={this.searchFont}>
            <h3>Google Fonts Search</h3>
            <div className="search-header">Categories</div>
            <div className="search-item">
              <label onClick={this.toggleCheckBox} ref="serif"><i className="material-icons">check_box_outline_blank</i> Serif</label>
              <label onClick={this.toggleCheckBox} ref="sansserif"><i className="material-icons">check_box_outline_blank</i> Sans-Serif</label>
              <label onClick={this.toggleCheckBox} ref="display"><i className="material-icons">check_box_outline_blank</i> Display</label>
              <label onClick={this.toggleCheckBox} ref="handwriting"><i className="material-icons">check_box_outline_blank</i> Handwriting</label>
              <label onClick={this.toggleCheckBox} ref="monospace"><i className="material-icons">check_box_outline_blank</i> Monospace</label>
            </div>
            <div className="search-header">Thickness</div>
            <div className="search-item">
              <label ref="fontWeight" className="inline" onClick={this.toggleCheckBox}><i className="material-icons">check_box_outline_blank</i></label>
              <span style={{ display: 'inline-block', width: '120px', 'paddingLeft': '20px'}}><input ref="thickness" type="range" max="9" min="1" step="1" defaultValue="4" /></span>
            </div>
          </div>
          <div className="app-content">
            <FontListView ref="fontlistview" />
          </div>
          <div ref="directory" className="app-directory open">
            <DirectoryManager ref="dir" />
          </div>          
        </div>
    );
  }
}

export default FontManager;
