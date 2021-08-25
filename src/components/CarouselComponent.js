import React from "react";
import {Carousel} from "react-bootstrap";

export default function CarouselComponent(props) {
    return (
        <div className="shadow bg-dark m-3 p-2">
            <Carousel interval={null}>
                {props.images && props.images.length > 0 ? (
                    props.images.map((image, index) => (
                        <Carousel.Item key={image.url}>
                            <img
                                className="d-block w-100"
                                src={image.url}
                                alt={`Image ${index+1}`}
                            />
                            <Carousel.Caption>
                                <h3>Image {index+1}</h3>
                                <p>No cation</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                ) : (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src=""
                            alt="No Images"
                        />
                        <Carousel.Caption>
                            <h3>No Images</h3>
                            <p>No cation</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
}
