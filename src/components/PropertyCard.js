import React from "react";
import {Link} from "react-router-dom";
import './stylesheets/PropertyCard.css';

export default function PropertyCard(props) {
    return (
        <div className="card shadow property-card m-2 mx-auto">
            <Link className="btn p-0" to={`/props/${props._id}`}>
                <img src={props.images?props.primaryImage:null} className="card-img-top" alt="Not found" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <div className="row row-cols-auto mx-auto mt-2">
                        <div className="card-text col bg-dark text-white mx-1 my-1 rounded"><strong>₹{props.priceperhour}</strong> per hour</div>
                        <div className="card-text col bg-light mx-1 my-1 rounded">{props.size} sq. ft.</div>
                        <div className="card-text col bg-light mx-1 my-1 rounded">{props.capacity} capacity</div>
                    </div>
                    <div className="row row-cols-auto mx-auto mt-2">
                        {props.functiontype.map((type) => (
                            <div key={type} className="card-text col bg-dark mx-1 my-1 text-white rounded">{type}</div>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}