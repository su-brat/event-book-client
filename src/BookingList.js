import React, {useState, useEffect, useContext} from 'react';
import BookingCard from './components/BookingCard';
import {SessionContext} from './contexts/session.context';
import axios from 'axios';

export default function BookingList(props) {
    const [bookings, setBookings] = useState([]);
    const {session: user} = useContext(SessionContext);
    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(`http://localhost:3001/customer/event-bookings/${user._id}`, {
                    withCredentials: true
                });
                setBookings(response.data.bookings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBookings();
    }, []);
    return (
        <div className="mt-5 pt-3 container">
            <div className="row row-cols-auto">
                {bookings.length>0 ? (bookings.map(booking => <BookingCard className="col" key={booking._id} {...booking}/>)) : (
                    <div>No bookings found</div>
                )}
            </div>
        </div>
    );
}