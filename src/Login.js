import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { SessionContext } from './contexts/session.context';
import axios from 'axios';
import {API_BASE} from './global/variables';

export default function Login(props) {
    const {session: user, fetchSession} = useContext(SessionContext);
    console.log(user);
    if(user) {
        props.history.goBack();
        return null;
    } else {
        async function handleSubmit(e) {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            try {
                const response = await axios.post(`${API_BASE}/customer/login`, {username, password}, {
                    withCredentials: true
                });
                if(response.data.message==='success') {
                    await fetchSession();
                    props.history.push('/');
                } else
                    throw new Error(response.data.error);
            } catch (err) {
                console.log(err);
                props.history.push({
                    pathname: '/post-result', 
                    result: 'Failed',
                    error: err.message
                });
            }
        }
        return (
            <div className="container mt-5 pt-3 mx-auto row-cols-md-2 row-cols-lg-3">
                <div className="text-center mx-auto mt-2">
                    <h2>Login</h2>
                </div>
                <div className="card col shadow m-3 p-3 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label>Email/Phone</label>
                            <input id="username" className="form-control" type="text" placeholder="Username" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input id="password" className="form-control" type="password" placeholder="Password" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger me-2">Login</button>
                            <Link to="/register" className="btn btn-outline-success ms-2">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}