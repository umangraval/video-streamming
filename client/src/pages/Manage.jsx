import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import Qrcode from "../components/Qrcode";
import QRCode from "qrcode.react";
import { Modal, Button } from "react-bootstrap";
import isEmpty from "../utils/isEmpty";
import "../assets/manage.css";
export default class Manage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      show: false,
      url: null,
      name: null
    };
    this.download = this.download.bind(this);
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

  download = pname => {
    // console.log(this.props.pname);
    const canvas = document.getElementsByClassName("QRCode");
    canvas[0].toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.download = `qrcode_${pname}`;
    link.href = document.getElementsByClassName("QRCode")[0].toDataURL();
    link.click();
  };

  handleClose = () => this.setState({ ...this.state, name: null, show: false });
  handleShow = (name, url) =>
    this.setState({ ...this.state, name, url, show: true });

  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return <Redirect to="/login" />;
    }
    const base_url = `${process.env.REACT_APP_CLIENT_URL}`;
    const { products, name, url } = this.state;
    return (
      <div className="container-fluid w-75 mt-5">
        <button
          type="button"
          class="btn btn-outline-info mb-3"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>{" "}
          Back
        </button>
        <div className="row p-4">
          <h2>Products</h2>
        </div>
        <div className="wrapper">
          {products.map(product => (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="edit-btns">
                  {/* <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => {
                      this.download(product.name);
                    }}
                  >
                    Download
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      this.handleShow(product.name, `/product/${product._id}`);
                    }}
                  >
                    QRcode
                  </button>
                  <Link to={{
                    pathname: `/product/${product._id}`,
                    state: {
                      product
                    }
                    }}>
                    <button type="button" className="btn btn-outline-info">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <center>
                <QRCode size={250} value={base_url + url} className="QRCode" />
              </center>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.download(name);
                }}
              >
                Download
              </button>
            </Modal.Footer>
          </Modal>
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
