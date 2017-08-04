import intl from 'react-intl-universal'
import React, { Component } from 'react';
const { clipboard } = window.require('electron');

class CopyText extends Component {

  constructor () {
    super();

    this.state = {
      inputText : "",
    }
  }

  appendInputText = (text) => {

    this.setState({
      inputText : this.state.inputText + text 
    })
  }

  handleInputText = (e) => {
    this.setState({
      inputText : e.target.innerHTML 
    })
  }

  handleCopyText = (e) => {
    const copyText = this.state.inputText;
    clipboard.writeText(copyText);
  }

  handleDeleteText = (e) => {
    this.setState({
      inputText : ''
    })
  }  

  handleDeleteTextItem = (e) => {
    const index = parseInt(e.target.getAttribute('data-index') || '-1', 10);

    let chars = [...this.state.inputText];
    
    if (index > -1) {
      chars.splice(index, 1);
    }

    this.setState({
      inputText : chars.join('')
    });
  }

  render() { 
    return (
        <div className="app-input">
            <div className="input-copy">
            <button className="btn large" onClick={this.handleCopyText}>{intl.get('app.inputCopy.text')}</button>
            </div>
            <div className="input-text" onClick={this.handleDeleteTextItem} data-placeholder={intl.get('app.inputText.placeholder')}>
            {[...this.state.inputText].map((text, index) => {
                return <span key={index} className="item" data-index={index} title={intl.get('app.inputText.item.title')}>{text}</span>
            })}
            </div>
            <div className="input-delete">
            <button className="btn large" onClick={this.handleDeleteText}><i className="icon icon-trashcan"></i></button>
            </div>          
        </div> 
    );
  }
}

export default CopyText;