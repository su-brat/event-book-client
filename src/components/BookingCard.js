import React from 'react';

export default function BookingCard(props) {
    const bordercolor = props.approved ? 'border-success' : 'border-danger';
    return (
        <div className={`card shadow m-4 ${bordercolor}`}>
            <div className="card-body">
                    <div className="mt-1"><strong>Booking id</strong></div>
                    <div>{props._id}</div>
                    <div className="mt-1"><strong>Book date</strong></div>
                    <div>{props.bookingDate}</div>
                    <div className="mt-1"><strong>Start date/time</strong></div>
                    <div>{props.startDateAndTime}</div>
                    <div className="mt-1"><strong>End date/time</strong></div>
                    <div>{props.endDateAndTime}</div>
                    <div className="mt-1"><strong>Occasion</strong></div>
                    <div>{props.type}</div>
            </div>
        </div>
    );
}