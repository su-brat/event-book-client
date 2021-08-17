import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import ToggleNavbar from './components/ToggleNavbar';
import Home from './Home';
import About from './About';
import PostResult from './PostResult';
import PropertyPage from './PropertyPage';
import Login from './Login';
import Signup from './Signup';
import BookingList from './BookingList';

import SessionProvider from './contexts/session.context';

function App() {
    return (
        <div>
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
            <SessionProvider>
                <ToggleNavbar />
                <Switch>
                    <Route exact path="/props/:id" component={PropertyPage} />
                    <Route exact path="/about-us" component={About} />
                    <Route exact path="/post-result" component={PostResult} />
                    <Route exact path="/bookings" component={BookingList} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Signup} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </SessionProvider>
        </div>
    );
}

export default App;
