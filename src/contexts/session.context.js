import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

const SessionContext = createContext();

export default function SessionProvider(props) {
    const [session, setSession] = useState(null);
    async function fetchSession() {
        console.log('Fetch session');
        try {
            const response = await axios.get('http://localhost:3001/customer/current-user', {
                withCredentials: true
            });
            setSession(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function destroySession() {
        console.log('Destroy session');
        try {
            const response = await axios.post('http://localhost:3001/customer/logout', {}, {
                withCredentials: true
            });
            if(response.data.message==='success') {
                setSession(null);
            } else {
                throw new Error('Couldn\'t log you out');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => fetchSession(), []);

    return <SessionContext.Provider value={{session, fetchSession, destroySession}}>{props.children}</SessionContext.Provider>;
}

export {SessionContext};