import React, { Component } from "react";
import API from "../API";

export default class Card extends Component {

  render() {
    return (
      <div className="col-sm-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <div onClick={() => {this.props.onDelete({use: this.props.use, _id: this.props._id})}} className="btn btn-danger">Delete</div>
          </div>
        </div>
      </div>
    );
  }
}
