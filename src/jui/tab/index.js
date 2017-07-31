
import React, { Component } from 'react';
import Children from 'react-children-utilities';
import './default.css';

export default class Tabs extends Component {

    constructor (props) {
        super(props)

        const activeTab = Children.filter(props.children, (child) => { return child.props.active }).map((it) => {
            return it.props.id;
        })[0];

        this.state = {
            activeTab : activeTab || ""
        }
    }

    onTabClick = (e) => {
        const id = e.target.getAttribute('data-id');

        this.setState({
            activeTab : id 
        })
    }

    createItemClass = (child) => {
        let itemClass = [];

        if (child.props.id === this.state.activeTab) {
            itemClass.push('active')
        }

        return itemClass.join(' ');
    }

    render() {
        return (
            <div className="tabs full">
                <ul className="tab top" onClick={this.handleTabClick} >
                    {React.Children.map(this.props.children, (child) => {
                        return (<li className={this.createItemClass(child)} data-id={child.props.id} onClick={this.onTabClick}>
                            <a href={'#' + child.props.id} style={{pointerEvents: 'none'}}>{child.props.title}</a>
                        </li>)
                    })}
                </ul>
                <div className="tab-container">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { active : this.state.activeTab === child.props.id })
                    })}
                </div>
            </div>
        );
    }
}
