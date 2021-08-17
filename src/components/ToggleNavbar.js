import React, {useContext} from "react";
import {NavLink, Link, withRouter} from "react-router-dom";
import {SessionContext} from "../contexts/session.context";

export default withRouter(function ToggleNavbar(props) {
    const {session: user, destroySession} = useContext(SessionContext);
    return (
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="navbar-brand my-auto ps-2" to="/">Brand</NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item p-1 nav-link m-auto"> │ </li>
                        <li className="nav-item p-1 m-auto">
                            <NavLink exact activeClassName="active" className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item p-1 m-auto">
                            <NavLink exact activeClassName="active" className="nav-link" to="/about-us">About us</NavLink>
                        </li>
                    </ul>
                    
                    {user ? (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item p-1 m-auto">
                                <NavLink exact activeClassName="active" className="nav-link" to="/bookings">My bookings</NavLink>
                            </li>
                            <li className="nav-item p-1 nav-link m-auto"> │ </li>
                            <li className="nav-item p-1 m-auto">
                                <a className="nav-link" href="#">{user.name}</a>
                            </li>
                            <li className="nav-item p-1 m-auto">
                                <button onClick={() => {
                                    destroySession();
                                    props.history.push("/");  
                                }} className="btn btn-sm btn-outline-danger" type="button">Logout</button>
                            </li>
                        </ul>
                    ) : ( 
                            
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item p-1 my-auto">
                                    <Link to="/login" className="btn btn-sm btn-danger" type="button">Login</Link>
                                </li>
                                <li className="nav-item p-1 my-auto">
                                    <Link to="/register" className="btn btn-sm btn-outline-success" type="button">Sign up</Link>
                                </li>
                            </ul>
                    )}
                </div>
            </div>
        </nav>
    );
});