import { builtinModules } from 'module';
import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_getCurrent } from 'scheduler/tracing';
import './index.css';

function NavButton(props) {
    return (
        <button onClick={props.onClick()}>
            {props.value}
        </button>
    )
}
class Header extends React.Component {
    render() {
        return (
            <div className="nav-bar-header">
                <span className="nav-button nav-button-left">
                    &larr; 
                </span>
                <span className="nav-bar-title">
                   {this.props.pageTitle} 
                </span>
                <span className="nav-button nav-button-right">
                    &rarr;
                </span>
            </div>
        )
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "The title goes here",
        }
    }
    render() {
        return (
            <div className="home-base">
                <Header pageTitle={this.state.currentPage}/>
                <h1>Hello world!</h1>
            </div>
        )
    }
}



// ========================================

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);