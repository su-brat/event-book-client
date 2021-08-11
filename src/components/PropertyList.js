import React, {useReducer, useEffect} from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";

const reduce = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, isLoading: true};
        case "SET_PROPERTIES":
            return {...state, properties: [...action.payload], isLoading: false};
        default:
            return state;
    }
}

export default function PropertyList(props) {
    // const defaultProperties = [{
    //     capacity: 600,
    //     contact: 9668108684,
    //     description: "",
    //     functiontype: ["B'day", "Party"],
    //     images: [{filename: "EventProps/cu6dev9usr3air6u0kzz", url: "https://res.cloudinary.com/cloud24x7/image/upload/v1628365428/EventProps/cu6dev9usr3air6u0kzz.jpg"}],
    //     location: {_id: "610f7ba60085f84194dfebd4", longitude: 84.78516509391488, latitude: 19.311034712463055, address: "GANDHI NAGAR", city: "BRAHMAPUR", state:"ODISHA", pincode: 760002},
    //     name: "",
    //     _id: "60e3fb7d426e5806cc9976e5",
    //     pricepershift: 50000,
    //     shift: 2,
    //     size: 15000
    // },
    // {
    //     capacity: 600,
    //     contact: 9668108684,
    //     description: "",
    //     functiontype: ["B'day", "Engagement", "Wedding", "Party"],
    //     images: [{filename: "EventProps/cu6dev9usr3air6u0kzz", url: "https://res.cloudinary.com/cloud24x7/image/upload/v1628365428/EventProps/cu6dev9usr3air6u0kzz.jpg"}],
    //     location: {_id: "610f7ba60085f84194dfebd4", longitude: 84.78516509391488, latitude: 19.311034712463055, address: "GANDHI NAGAR", city: "BRAHMAPUR", state:"ODISHA", pincode: 760002},
    //     name: "Property",
    //     _id: "60e3fb7d426e5806cc9976e4",
    //     pricepershift: 50000,
    //     shift: 2,
    //     size: 15000
    // },
    // {
    //     capacity: 600,
    //     contact: 9668108684,
    //     description: "",
    //     functiontype: ["B'day", "Engagement", "Wedding", "Thread Ceremony", "Party"],
    //     images: [{filename: "EventProps/cu6dev9usr3air6u0kzz", url: "https://res.cloudinary.com/cloud24x7/image/upload/v1628365428/EventProps/cu6dev9usr3air6u0kzz.jpg"}],
    //     location: {_id: "610f7ba60085f84194dfebd4", longitude: 84.78516509391488, latitude: 19.311034712463055, address: "GANDHI NAGAR", city: "BRAHMAPUR", state:"ODISHA", pincode: 760002},
    //     name: "Property",
    //     _id: "60e3fb7d426e5806cc9976e3",
    //     pricepershift: 50000,
    //     shift: 2,
    //     size: 15000
    // },
    // {
    //     capacity: 600,
    //     contact: 9668108684,
    //     description: "",
    //     functiontype: ["B'day", "Wedding", "Thread Ceremony", "Party"],
    //     images: [{filename: "EventProps/cu6dev9usr3air6u0kzz", url: "https://res.cloudinary.com/cloud24x7/image/upload/v1628365428/EventProps/cu6dev9usr3air6u0kzz.jpg"}],
    //     location: {_id: "610f7ba60085f84194dfebd4", longitude: 84.78516509391488, latitude: 19.311034712463055, address: "GANDHI NAGAR", city: "BRAHMAPUR", state:"ODISHA", pincode: 760002},
    //     name: "Property",
    //     _id: "60e3fb7d426e5806cc9976e2",
    //     pricepershift: 50000,
    //     shift: 2,
    //     size: 15000
    // },
    // {
    //     capacity: 600,
    //     contact: 9668108684,
    //     description: "",
    //     functiontype: ["B'day", "Engagement", "Wedding", "Thread Ceremony", "Party"],
    //     images: [{filename: "EventProps/cu6dev9usr3air6u0kzz", url: "https://res.cloudinary.com/cloud24x7/image/upload/v1628365428/EventProps/cu6dev9usr3air6u0kzz.jpg"}],
    //     location: {_id: "610f7ba60085f84194dfebd4", longitude: 84.78516509391488, latitude: 19.311034712463055, address: "GANDHI NAGAR", city: "BRAHMAPUR", state:"ODISHA", pincode: 760002},
    //     name: "Property",
    //     _id: "60e3fb7d426e5806cc9976e1",
    //     pricepershift: 50000,
    //     shift: 2,
    //     size: 15000
    // }];
    const [state, dispatch] = useReducer(reduce, {properties: [], isLoading: false});
    useEffect(() => {
        dispatch({type: "LOADING"});
        const {city, lng, lat} = props;
        console.log(city, lng, lat); //to be removed 
        let query;
        if(lng && lat)
            query = `lng=${lng}&lat=${lat}&dist=30`;
        else
            query = `city=${city}`;
        axios.get(`http://localhost:3001/api/props?${query}`)
        .then(res => res.data.props)
        .then(properties => dispatch({type: "SET_PROPERTIES", payload: properties}))
        .catch(err => console.log(err));
    }, [props]);
    return (
        <div className="container-fluid">
            {state.isLoading && <div className="text-secondary">Loading...</div>}
            {/* {defaultProperties.length>0 ? ( */}
            {!state.isLoading && (state.properties.length>0 ? (
                <div className="row row-cols-sm-2 row-cols-lg-3">
                    {/* {defaultProperties.map(property => { */}
                    {state.properties.map(property => {
                        return <div key={property._id} className="col"><PropertyCard {...property}/></div>;
                    })}
                </div>
            ) : (
                <div className="text-center">No results found</div>
            ))}
        </div>
    );
}