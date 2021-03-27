import React from "react";
import { Link, Redirect } from "react-router-dom";
import isEmpty from "../utils/isEmpty";

export default function Home(props) {
  const { user } = props;
  if (isEmpty(user)) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="dash p-3">
      <div className="row opt">
        <div className="col">
          <Link to="/up">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg btn-block dash-btn"
            >
              Upload
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to="/pnc">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg btn-block dash-btn"
            >
              PnC
            </button>
          </Link>
        </div>
      </div>
      <div className="row opt">
        {/* <div className="col">
        </div> */}
        <div className="col">
          <Link to="/manage">
            <button
              type="button"
              className="btn btn-outline-info btn-lg btn-block dash-btn"
            >
              Manage
            </button>
          </Link>
        </div>
        {/* <div className="col">
        </div> */}
      </div>
    </div>
  );
}
