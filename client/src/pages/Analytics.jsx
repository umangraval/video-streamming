import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Chart from "react-apexcharts";
import isEmpty from "../utils/isEmpty";

export default class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/products`
      );
      const data = await response.json();
      console.log(data);
      this.setState({ products: [...data] });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return <Redirect to="/login" />;
    }
    const qrcodedata = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: this.state.products.map(a => a.name) 
          }
        },
        series: [
          {
            name: "Scans",
            data: this.state.products.map(a => a.hits)
          }
        ]
      };
    return (
      <div className="container-fluid w-75 mt-5">
        <button
          type="button"
          className="btn btn-outline-info mb-3"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>{" "}
          Back
        </button>
        <div className="row m-2">
        <h3>Product Scans</h3>
        </div>
        <div className="row">
            <div className="col d-flex justify-content-center">
            <Chart
              options={qrcodedata.options}
              series={qrcodedata.series}
              type="bar"
              width="700"
            />
            </div>
        </div>
      </div>
    );
  }
}
