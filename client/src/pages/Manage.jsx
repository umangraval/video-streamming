import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Qrcode from "../components/Qrcode";
import QRCode from "qrcode.react";
import "../assets/manage.css";
export default class Manage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      show: false,
      url: null,
      pname: ""
    };
    // this.download = this.download.bind(this);
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

  download = () => {
    // console.log(this.props.pname);
    const canvas = document.getElementsByClassName("QRCode");
    canvas[0].toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.download = `qrcode_${this.state.pname}`;
    link.href = document.getElementsByClassName("QRCode")[0].toDataURL();
    link.click();
  };

  render() {
    const url = `${process.env.REACT_APP_CLIENT_URL}${this.state.url}`;
    return (
      <div>
        <div className="wrapper container-fluid w-75 mt-5">
          <div className="card shadow">
            <QRCode size={250} value={url} className="QRCode" />
            <div className="card-body">
              <h5 className="card-title">Product Name</h5>
              <div className="edit-btns">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={this.download}
                >
                  Download
                </button>
                <button type="button" className="btn btn-outline-info">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
            {this.state.products.map(product => (
              <div className="col-md-4" key={product._id}>
                <div className="card border-0">
                  <Link to={`/product/${product._id}`}>
                    <div className="card-body">
                      <p>{product.name}</p>
                    </div>
                  </Link>
                  <Qrcode
                    url={`/product/${product._id}`}
                    pname={product.name}
                  />
                </div>
              </div>
            ))}
          </div> */}
      </div>
    );
  }
}
