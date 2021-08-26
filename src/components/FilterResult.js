import React, {useReducer} from "react";
import PropertyList from "./PropertyList";

export default function FilterResult(props) {

    const initialState = {
        filter: false,
        maxPrice: null,
        minCapacity: null,
        occasion: null
    };

    const reduce = (state, action) => {
        const {maxPrice, minCapacity, occasion} = action.payload;
        return {filter: !state.filter, maxPrice, minCapacity, occasion};
    };

    const [state, dispatch] = useReducer(reduce, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({payload: {maxPrice: e.target.maxPrice.value, minCapacity: e.target.minCapacity.value, occasion: e.target.occasion.value}});
    };

    return (
        <div className="p-auto">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 col-md-3 my-1">
                        <input id="maxPrice" className="form-control" type="number" placeholder="Max. Price" />
                    </div>
                    <div className="col-sm-6 col-md-3 my-1">
                        <input id="minCapacity" className="form-control" type="number" placeholder="Min. Capacity" />
                    </div>
                    <div className="col-sm-6 col-md-3 my-1">
                        <input id="occasion" className="form-control" type="text" placeholder="Occasion" />
                    </div>
                    <div className="col-sm-6 col-md-3 my-1">
                        <button className={state.filter?'btn btn-secondary':'btn btn-outline-secondary'} type="submit">Filter</button>
                    </div>
                </div>
            </form>
            <PropertyList {...props} {...state} />
        </div>
    );
}