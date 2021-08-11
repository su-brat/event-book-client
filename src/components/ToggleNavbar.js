import React from "react";
import {NavLink} from "react-router-dom";
export default function ToggleNavbar(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand mx-auto px-2" href="#">Brand</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact activeClassName="active" className="nav-link" to="/about-us">About us</NavLink>
                        </li>
                    </ul>
                    
                    {props.user ? (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item p-1">
                                <a className="nav-link" href="#">props.user.name</a>
                            </li>
                            <li className="nav-item p-1">
                                <button className="btn btn-sm btn-outline-danger" type="button">Logout</button>
                            </li>
                        </ul>
                    ) : ( 
                            
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item p-1">
                                    <button className="btn btn-sm btn-danger" type="button">Login</button>
                                </li>
                                <li className="nav-item p-1">
                                    <button className="btn btn-sm btn-outline-success" type="button">Sign up</button>
                                </li>
                            </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}