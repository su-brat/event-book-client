import React, {useState} from "react";

export default function FindPropForm(props) {
    const [fieldValue, setFieldValue] = useState('');
    function onChange(e) {
        setFieldValue(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        props.onSubmit({city: fieldValue});
    }
    function onLocate(e) {
        window.navigator.geolocation.getCurrentPosition(position => props.onSubmit({lng: position.coords.longitude, lat: position.coords.latitude}));
    }
    return (
        <div className="card">
            <div className="card-body">
                <form {...{onSubmit}}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="In which city is your event?" aria-label="City" {...{onChange}} />
                        <div className="input-group-append">
                            <span className="input-group-text"><button className="btn" type="button" onClick={onLocate}><i className="fas fa-map-marker-alt"></i></button></span>
                        </div>
                    </div>
                    <button className="btn btn-danger w-100" type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}