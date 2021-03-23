import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Qrcode from "../components/Qrcode";
import { Modal, Button } from "react-bootstrap";
import API from "../API";
import "../assets/manage.css";

export default class ProductView extends Component {
  constructor() {
    super();
    this.state = {
      medias: {},
      show: false,
      pname: "",
      cmedias: [],
      deletemedia: null
    };
    // this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const { _id, name } = this.props.location.state.product;
      this.setState({ ...this.state, pname: name });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/medias/${_id}`
      );
      const data = await response.json();
      let group = data.reduce((r, a) => {
        // console.log("a", a);
        // console.log('r', r);
        r[a.categoryname] = [...(r[a.categoryname] || []), a];
        return r;
      }, {});
      //  console.log(group);
      this.setState({ ...this.state, medias: group });
      // Object.keys(this.state.medias).forEach( e => {
      //   console.log(e);
      // });
    } catch (error) {
      console.log(error);
    }
  }

  handleClose = () => this.setState({ ...this.state, show: false });
  handleShow = e => {
    this.setState({ ...this.state, show: true, deletemedia: e });
  };

  showMedias = (e, medias) => {
    var c = document.getElementsByClassName("curr");
    if (c.length > 0) c[0].classList.remove("curr");
    e.target.classList.add("curr");
    this.setState({ ...this.state, cmedias: medias });
  };

  async onDelete() {
    try {
      await API.delete(
        `${process.env.REACT_APP_BASE_URL}/media/delete/${this.state.deletemedia._id}`
      );
      var curr = this.state.deletemedia._id;
      var rem = this.state.cmedias.filter(media => {
        return media._id !== curr;
      });
      console.log(rem);

      this.setState({
        ...this.state,
        cmedias: rem,
        deletemedia: null
      });
      this.handleClose();
    } catch (error) {
      this.handleClose();
      console.log(error);
    }
  }

  render() {
    const base_url = `${process.env.REACT_APP_BASE_URL}`;
    const { pname, medias, cmedias } = this.state;
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
        <div>
          <div className="row p-4">
            <h2>{pname}</h2>
          </div>
          <div className="row">
            <div className="col listview">
              <div className="shadow">
                <ul className="list-group">
                  {Object.keys(medias).map(e => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={event => {
                        this.showMedias(event, medias[e]);
                      }}
                    >
                      {e}
                      <span className="badge badge-primary badge-pill">
                        {medias[e].length}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col listview">
              {cmedias.map(e => (
                <div className="card mb-4 shadow">
                  <div className="row">
                    <div className="col">
                      <div className="card-body">
                        <h5 className="card-title">{e.name}</h5>
                        <p class="card-text">{e.description}</p>
                      </div>
                      <div className="edit-btns m-3">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            this.handleShow(e);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="col text-right">
                      <img
                        src={base_url + e.poster}
                        width="248"
                        height="170"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            Are you sure you want to delete{" "}
            {this.state.deletemedia ? this.state.deletemedia.name : ""}?
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
              className="btn btn-danger"
              onClick={() => {
                this.onDelete();
              }}
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
