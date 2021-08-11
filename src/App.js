import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import ToggleNavbar from './components/ToggleNavbar';
import Home from './Home';
import About from './About';
import PropertyPage from './PropertyPage';

function App() {
    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header> */}
            <ToggleNavbar />
            <Switch>
                <Route exact path="/props/:id" render={routeProps => <PropertyPage {...routeProps.location.details}/>} />
                <Route exact path="/about-us" render={() => <About />} />
                <Route exact path="/" render={() => <Home />} />
            </Switch>
        </div>
    );
}

export default App;
