import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { SessionContext } from './contexts/session.context';
import axios from 'axios';

export default function Signup(props) {
    const {session: user, fetchSession} = useContext(SessionContext);
    if(user) {
        props.history.goBack();
        return null;
    } else {
        async function handleSubmit(e) {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;
            const phone = e.target.phone.value;
            if(password===confirmPassword) {
                try {
                    const response = await axios.post('http://localhost:3001/customer/register', {name, email, password, phone}, {
                        withCredentials: true
                    });
                    if(response.data.message === 'success') {
                        await fetchSession();
                        props.history.push('/');
                    } else {
                        throw new Error(response.data.error);
                    }
                } catch(error) {
                    console.log(error);
                    props.history.push({
                        pathname: '/post-result', 
                        result: 'Failed',
                        error: error.message
                    });
                }
            } else
                window.prompt('Passwords do not match', 'Password and confirm password do not match');
        }
        return (
            <div className="container mt-5 pt-3 mx-auto row-cols-md-2 row-cols-lg-3">
                <div className="form-group text-center mx-auto mt-2">
                    <h2>Register</h2>
                </div>
                <div className="card col shadow m-3 p-3 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label>Name</label>
                            <input id="name" type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Email</label>
                            <input id="email" type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Phone</label>
                            <input id="phone" type="phone" className="form-control" placeholder="Phone" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Password</label>
                            <input id="password" type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Confirm Password</label>
                            <input id="confirmPassword" type="text" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-success me-2">Sign Up</button>
                            <Link to="/login" className="btn btn-outline-danger ms-2">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}