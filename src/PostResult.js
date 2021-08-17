import React from "react";
import {Link} from "react-router-dom";
export default function PostResult(props) {
  return (
    <div className="my-5 py-3 mx-auto">
        <div className="text-center display-6 my-5">
            {(props.history.location.error && <div className="my-2">{props.history.location.error}<br />Please go home and retry</div>) || props.history.location.result}
        </div>
        <div className="text-center">
            Go back to <Link to="/">home</Link>
        </div>
    </div>
  );
}