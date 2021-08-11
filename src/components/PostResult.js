import React from "react";
import {Link} from "react-router-dom";
export default function PostResult(props) {
  return (
    <div className="m-auto">
        <div className="text-center">
            {props.body}
        </div>
        <div className="text-center">
            Go back to <Link to="/">home</Link>
        </div>
    </div>
  );
}