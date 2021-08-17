import React, {useState, useEffect} from 'react';
import CarouselComponent from './components/CarouselComponent';
import {v4 as uuid} from 'uuid';
import BookCard from './components/BookCard';
import axios from 'axios';

export default function PropertyPage(props) {
    const [state, setState] = useState(null);
    console.log(props);
    useEffect(() => {
        async function loadData() {
            try {
                const id = props.match.params.id;
                const response = await axios.get(`http://localhost:3001/api/props/${id}`, {
                    withCredentials: true
                });
                setState(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        loadData();
    }, [props]);
    return (
        <div>
            <div className="container mt-5 pt-3 px-5">
                <CarouselComponent images={state && state.images} />
            </div>
            <div className="container-fluid px-5">
                <hr />
                <div className="row">
                    <div className="col-lg-7">
                        <div className="card my-2 mx-1">
                            <div className="card-header">
                                <h4 className="card-title">Description</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {state && state.description}
                                </p>
                            </div>
                        </div>
                        <div className="card my-2 mx-1">
                            <div className="card-header">
                                <h4 className="card-title">For events</h4>
                            </div>
                            <div className="card-body">
                                <div className="row row-cols-auto">
                                    {state && state.functiontype.map((type) => (
                                        <div key={uuid()} className="card-text col bg-dark mx-1 my-1 text-white rounded">{type}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card my-2 mx-1">
                            <div className="card-header">
                                <h4 className="card-title">Other property details</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Price per hour</th>
                                            <td>₹{state && state.priceperhour}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Capacity</th>
                                            <td>{state && state.capacity} people</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Size</th>
                                            <td>{state && state.size} sq.ft.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <BookCard propId={state && state._id} pricePerHour={state && state.priceperhour} />
                    </div>
                </div>
            </div>
        </div>
    );
}
