import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Qrcode from "../components/Qrcode";
import { Modal, Button } from "react-bootstrap";
import "../assets/manage.css";

export default class ProductView extends Component {
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

  handleClose = () => this.setState({ ...this.state, show: false });
  handleShow = () => this.setState({ ...this.state, show: true });

  render() {
    const url = `${process.env.REACT_APP_CLIENT_URL}${this.state.url}`;
    return (
      <div>
        <div className="container-fluid w-75 mt-5">
          <div className="row p-4">
            <h2>Product Name</h2>
          </div>
          <div className="row">
            <div className="col listview">
              <div className="shadow">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    BathRoom
                    <span class="badge badge-primary badge-pill">4</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Kitchen
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Living Room
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col listview">
              <div className="card mb-4 shadow">
                <div className="row">
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">Highlighter</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <div className="edit-btns m-3">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={this.handleShow}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/07/16191441/Types-Of-Tiles-Ceramic.jpg"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div className="card mb-4 shadow">
                <div className="row">
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">Flooring</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <div className="edit-btns m-3">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={this.handleShow}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src="https://www.supergres.com/images/stories/flexicontent/m_anteprima_brecce_bagno-riv-5.jpg"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>Are you sure you want to delete?</Modal.Body>
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
              className="btn btn-danger"
              onClick={this.handleClose}
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>
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
