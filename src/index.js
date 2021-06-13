import { builtinModules } from 'module';
import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_getCurrent } from 'scheduler/tracing';
import './index.css';

import leftArrow from './img/left-arrow.svg';
import rightArrow from './img/right-arrow.svg';

function NavButton(props) {
    return (
        <span 
            className={`nav-button ${props.navClass}`}
            onClick={props.onClick}
        >
            <img
                src={props.icon}
                alt="nav-arrow"
            ></img>
        </span>
    )
}

class Header extends React.Component {

    renderNavButton(lr) {
        let lrClass,lrIcon;
        if (lr === "left") {
            lrClass = "nav-button-left";
            lrIcon = leftArrow;
        } else if (lr === "right") {
            lrClass = "nav-button-right";
            lrIcon = rightArrow;
        } else return;
        return (
                <NavButton
                    icon={lrIcon}
                    onClick={() => this.props.onClick(lr)}
                    navClass={lrClass}      
                />
        )
    }
    render() {
        return (
            <div className="nav-bar-header">
                {this.renderNavButton('left')}
                <span className="nav-bar-title">
                   {this.props.pageTitle} 
                </span>
                {this.renderNavButton('right')}
            </div>
        )
    }
}

class HomePage extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            msg: "I am Home!"
        }
    }
    render() {
        return (
            <h1>{this.state.msg}</h1>
        )
    }
}

class JobPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [ 
                {
                    name: "Kiana",
                    jobs: [
                        "Dishwaser",
                        "Table-Set & Clean as needed",
                        "Lawn 1x/week",
                        "Bathroom (daily)",
                        "Cooking-2 nights/week"
                    ]
                },
                {
                    name: "Micah",
                    jobs: [
                        "Trash & Recycle as needed",
                        "Compost bin as needed",
                        "Water & Weed Garden & Pick ripe veg (daily)",
                        "Water back yard plants (daily)",
                        "Deck cleanup (daily-after supper)"
                    ]
                },
                {
                    name: "Jacobi",
                    jobs: [
                        "Floors (Tues/Thu/Sat",
                        "Towels",
                        "Water plants on front porch (daily)",
                        "Pool (daily)",
                        "Clean water for Macy (daily)"
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <table className="kids-job-table">
                <thead>
                    <tr>
                        {this.state.jobs.map(j => {
                            return <th>{j.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {this.state.jobs.map( k => {
                            return <td>
                                <ul>
                                    {k.jobs.map( d => {
                                        return <li>{d}</li>
                                    } )}
                                </ul>
                            </td>
                        })}
                    </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

class TimerPage extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            msg: "I am Timer!"
        }
    }
    render() {
        return (
            <h1>{this.state.msg}</h1>
        )
    }
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.pages = [
            {
                title: "Home Page",
                component: HomePage
            },
            {
                title: "Timer",
                component: TimerPage
            },
            {
                title: "Job List",
                component: JobPage
            }
        ];
        this.state = {
            currentPageIndex: 0,
            currentPageTitle: this.pages[0].title,
            currentPageElement: React.createElement(this.pages[0].component,{})
        }
    }
    navClick(lr) {
        var maxPage = this.pages.length;
        let newPageIndex;
        if (lr == "right") {
            newPageIndex = this.state.currentPageIndex+1;
            if (newPageIndex >= maxPage) newPageIndex = 0;
        } else if (lr == "left") {
            newPageIndex = this.state.currentPageIndex-1;
            if (newPageIndex<0) newPageIndex = maxPage-1; 
        }
        const newComponent = React.createElement(this.pages[newPageIndex].component)
        this.setState({
            currentPageIndex: newPageIndex,
            currentPageTitle: this.pages[newPageIndex].title,
            currentPageElement: newComponent
        })
    }
    addPage(parms) {
        if ( !parms.name || !parms.title ) return "No valid page parameters";
        let newPage = {};
        newPage.name = parms.name;
        newPage.title = parms.title;
        this.pages.push(newPage);
    }
    
    render() {
        return (
            <div className="home-base">
                <Header pageTitle={this.state.currentPageTitle}
                        onClick={(lr) => this.navClick(lr)}
                />
                {this.state.currentPageElement}
            </div>
        )
    }
}


// ========================================

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);