import React, {useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {SessionContext} from '../contexts/session.context';
import {API_BASE} from '../global/variables';

const dateTimeString = dateTime => {
    return `${dateTime.getMonth()+1}-${dateTime.getDate()}-${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
}

const dateString = dateTime => {
    return `${dateTime.getMonth()+1}-${dateTime.getDate()}-${dateTime.getFullYear()}`;
}

export default withRouter(function BookCard(props) {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const currentDate = new Date(dateString(tomorrow));
    const [eventDate, setEventDate] = useState(currentDate);
    const [bookedDates, setBookedDates] = useState([]);
    const [eventStartTime, setStartTime] = useState('');
    const {session: user} = useContext(SessionContext);

    async function handleSubmit(e) {
        e.preventDefault();
        if(user) {
            let startTime = document.getElementById('startTime').value;
            let endTime = document.getElementById('endTime').value;
            let type = document.getElementById('eventType').value;
            if(startTime.length<9 && endTime.length<9 && type) {
                const startDateAndTime = dateString(eventDate) + " " + startTime;
                const endDateAndTime = dateString(eventDate) + " " + endTime;
                try {
                    const response = await axios.post(`${API_BASE}/customer/request-booking`, { startDateAndTime, endDateAndTime, propId: props.propId, type }, {
                        withCredentials: true
                    });
                    // redirect response to PostResult page
                    props.history.push({
                        pathname: '/post-result', 
                        result: response.data.message,
                        error: response.data.error
                    });
                } catch(error) {
                    console.log(error);
                    props.history.push({
                        pathname: '/post-result', 
                        result: 'failed',
                        error: error.message
                    });
                }
            }
        } else {
            props.history.push('/login');
        }
    }

    const generateTextTimes = (exclusion) => {
        let arr = [];
        for(let i = 0; i < 24; i++) {
            let skip = false;
            for(let j = 0; j < exclusion.length; j++) {
                if(i>=new Date(exclusion[j].startDateTime).getHours() && i<new Date(exclusion[j].endDateTime).getHours()) {
                    skip = true;
                    break;
                }
            }
            if(skip) continue;
            if(i<10) {
                arr.push(`0${i}`);
            } else {
                arr.push(`${i}`);
            }
        }
        return arr;
    }

    const generateTextEndTimes = (exclusion) => {
        let arr = [];
        for(let i = parseInt(eventStartTime.split(':')[0])+1; i < 24; i++) {
            let stop = false;
            for(let j = 0; j < exclusion.length; j++) {
                if(i>new Date(exclusion[j].startDateTime).getHours() && i<=new Date(exclusion[j].endDateTime).getHours()) {
                    stop = true;
                    break;
                }
            }
            if(stop) break;
            if(i<10) {
                arr.push(`0${i}`);
            } else {
                arr.push(`${i}`);
            }
        }
        return arr;
    }

    useEffect(() => {
        const fetchBookedDates = async () => {
            const startDateTime = dateTimeString(eventDate);
            const endDateTime = dateString(eventDate)+" 23:59:59";
            console.log(" ... response");
            const response = await axios.get(`${API_BASE}/api/event-bookings?propId=${props.propId}&fromDate=${startDateTime}&toDate=${endDateTime}`, {
                withCredentials: true
            });
            console.log(response);
            setBookedDates(response.data.bookings.map(booking => {
                return {startDateTime: booking.startDateAndTime, endDateTime: booking.endDateAndTime}
            }));
        };
        fetchBookedDates();
    }, [props, eventDate]);
    return (
        <div className="card shadow my-2 mx-1">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label><strong>Event Date</strong></label>
                        <Calendar className="mx-auto" defaultValue={currentDate} onChange={(date) => setEventDate(date)} tileDisabled={({activeStartDate, date, view}) => view==='month' && date<currentDate} />
                    </div>
                    <div>
                        <label><strong>Event start time</strong></label>
                        <select id="startTime" onChange={(e) => setStartTime(e.target.value)} className="form-select mb-3" aria-label="event start time">
                            <option>Select start time</option>
                            {generateTextTimes(bookedDates).map((value) => (
                                <option key={value} value={`${value}:00:00`}>{`${value}:00`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label><strong>Event end time</strong></label>
                        <select id="endTime" className="form-select mb-3" aria-label="event end time">
                            <option>Select end time</option>
                            {generateTextEndTimes(bookedDates).map((value) => (
                                <option key={value} value={`${value}:00:00`}>{`${value}:00`}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label><strong>Event occasion</strong></label>
                        <input type="text" className="form-control" id="eventType" placeholder="Occasion" />
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-danger w-100" type="submit">Request Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
});