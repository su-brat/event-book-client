import React, {useReducer, useEffect} from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import {API_BASE} from '../global/variables';

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
    const [state, dispatch] = useReducer(reduce, {properties: [], isLoading: false});
    useEffect(() => {
        async function setProperties() {
            const {city, lng, lat, filter, maxPrice, minCapacity, occasion} = props;
            async function fetchData() {
                dispatch({type: "LOADING"});
                let query = 'available=true';
                if(lng && lat)
                    query += `&lng=${lng}&lat=${lat}&dist=30`;
                else
                    query += `&city=${city}`;
                try {
                    const res = await axios.get(`${API_BASE}/api/props?${query}`, {
                        withCredentials: true
                    });
                    return res.data.props;
                } catch (e) {
                    console.log(e);
                    return null;
                }
            }
            let properties = await fetchData();
            if(filter && properties) {
                if(occasion)
                    properties = properties.filter(p => p.functiontype.map(o => o.toUpperCase()).includes(occasion.toUpperCase()));
                if(maxPrice)
                    properties = properties.filter(p => p.priceperhour <= maxPrice);
                if(minCapacity)
                    properties = properties.filter(p => p.capacity >= minCapacity);
            }
            dispatch({type: "SET_PROPERTIES", payload: properties});
        }
        setProperties();
    }, [props]);
    return (
        <div className="container-fluid">
            {state.isLoading && <div className="text-secondary">Loading...</div>}
            {!state.isLoading && (state.properties.length>0 ? (
                <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
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