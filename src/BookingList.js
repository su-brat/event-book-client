import React, {useState, useEffect, useContext} from 'react';
import BookingCard from './components/BookingCard';
import {SessionContext} from './contexts/session.context';
import axios from 'axios';
import {API_BASE} from './global/variables';

export default function BookingList(props) {
    const [bookings, setBookings] = useState([]);
    const {session: user} = useContext(SessionContext);
    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.get(`${API_BASE}/customer/event-bookings/${user._id}`, {
                    withCredentials: true
                });
                const data = response.data.bookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBookings();
    }, [user]);
    return (
        <div className="mt-5 pt-3 container">
            <div className="row row-cols-auto">
                {bookings.length>0 ? (bookings.map(booking => <BookingCard className="col" key={booking._id} {...booking}/>)) : (
                    <div className="mx-auto my-5">No bookings found</div>
                )}
            </div>
        </div>
    );
}