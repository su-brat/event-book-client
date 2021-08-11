import React from 'react';
import CarouselComponent from './components/CarouselComponent';
import {v4 as uuid} from 'uuid';
import BookCard from './components/BookCard';

export default function PropertyPage(props) {
    return (
        <div>
            <div className="container mt-5 pt-3 px-5">
                <CarouselComponent images={props.images} />
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
                                    {props.description}
                                </p>
                            </div>
                        </div>
                        <div className="card my-2 mx-1">
                            <div className="card-header">
                                <h4 className="card-title">For events</h4>
                            </div>
                            <div className="card-body">
                                <div className="row row-cols-auto">
                                    {props.functiontype.map((type) => (
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
                                            <th scope="row">Capacity</th>
                                            <td>{props.capacity}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Size</th>
                                            <td>{props.size}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Shifts per day</th>
                                            <td>{props.shift}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <BookCard propId={props._id} pricepershift={props.pricepershift} />
                    </div>
                </div>
            </div>
        </div>
    );
}
