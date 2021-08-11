import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

const dateTimeString = dateTime => {
    return `${dateTime.getMonth()+1}-${dateTime.getDate()}-${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
}

const dateString = dateTime => {
    return `${dateTime.getMonth()+1}-${dateTime.getDate()}-${dateTime.getFullYear()}`;
}

export default function BookCard(props) {
    const [eventDate, setEventDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const [eventStartTime, setStartTime] = useState('');
    const today = new Date();
    const currentDate = new Date(dateString(today));
    console.log(currentDate);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('eventDate I am submitted');
        let startTime = document.getElementById('startTime').value;
        let endTime = document.getElementById('endTime').value;
        console.log(`startTime: ${startTime}`);
        console.log(`endTime: ${endTime}`);
        if(startTime.length<9 && endTime.length<9) {
            const startDateAndTime = dateString(eventDate) + " " + startTime;
            const endDateAndTime = dateString(eventDate) + " " + endTime;
            const response = await axios.post('http://localhost:3001/api/request-booking', { startDateAndTime, endDateAndTime, propId: props.propId, userId: uuid() });
            console.log(response.data);
        }
    }

    const generateTextTimes = (exclusion) => {
        console.log(exclusion);
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
        console.log(exclusion);
        let arr = [];
        for(let i = parseInt(eventStartTime.split(':')[0])+1; i < 24; i++) {
            let stop = false;
            for(let j = 0; j < exclusion.length; j++) {
                console.log(exclusion[j]);
                if(i>new Date(exclusion[j].startDateTime).getHours() && i<=new Date(exclusion[j].endDateTime).getHours()) {
                    console.log('stop');
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
            console.log('Entered effect...');
            const startDateTime = dateTimeString(eventDate);
            const endDateTime = dateString(eventDate)+" 23:59:59";
            const response = await axios.get(`http://localhost:3001/api/event-bookings?propId=${props.propId}&fromDate=${startDateTime}&toDate=${endDateTime}`);
            console.log(response);
            setBookedDates(response.data.bookings.map(booking => {
                return {startDateTime: booking.startDateAndTime, endDateTime: booking.endDateAndTime}
            }));
        };
        console.log('fetching dates...:', bookedDates);
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
                            <option selected>Select start time</option>
                            {generateTextTimes(bookedDates).map((value) => (
                                <option value={`${value}:00:00`}>{`${value}:00`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label><strong>Event end time</strong></label>
                        <select id="endTime" className="form-select mb-3" aria-label="event end time">
                            <option selected>Select end time</option>
                            {generateTextEndTimes(bookedDates).map((value) => (
                                <option value={`${value}:00:00`}>{`${value}:00`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-danger w-100" type="submit">Request Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
}