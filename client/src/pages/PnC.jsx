import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import isEmpty from "../utils/isEmpty";
import API from "../API";

export default class PnC extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      msg: null,
      cerr: null,
      perr: null,
      cname: "",
      pname: "",
      slug: "",
      success: false,
      show: false,
      deleteitem: null,
      deletetype: null
    };
    this.onChange = this.onChange.bind(this);
    this.onProductSubmit = this.onProductSubmit.bind(this);
    this.onCategorySubmit = this.onCategorySubmit.bind(this);
    this.onPDelete = this.onPDelete.bind(this);
    this.onCDelete = this.onCDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const presponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/products`
      );
      const pdata = await presponse.json();
      this.setState({ ...this.state, products: [...pdata] });
      const cresponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/category/categories`
      );
      const cdata = await cresponse.json();
      this.setState({ ...this.state, categories: [...cdata] });
    } catch (error) {
      console.log(error);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onCategorySubmit(e) {
    try {
      e.preventDefault();
      if (!this.state.cname) {
        this.setState({ ...this.state, cerr: "Category Name Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            cerr: null
          });
        }, 2000);

        return;
      }
      const data = await API.post(
        `${process.env.REACT_APP_BASE_URL}/category/`,
        {
          name: this.state.cname
        }
      );
      this.setState({
        ...this.state,
        cname: "",
        success: true,
        categories: [...this.state.categories, data.data]
      });

      setTimeout(() => {
        this.setState({
          ...this.state,
          success: false
        });
      }, 2000);
    } catch (error) {
      if (error.response.data.error)
        this.setState({ ...this.state, uerr: error.response.data.error });
      console.log(error);
    }
  }

  async onProductSubmit(e) {
    try {
      e.preventDefault();
      if (!this.state.pname) {
        this.setState({ ...this.state, perr: "Product Name Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            perr: null
          });
        }, 2000);

        return;
      }
      if (!this.state.slug) {
        this.setState({ ...this.state, perr: "Slug Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            perr: null
          });
        }, 2000);

        return;
      }
      const data = await API.post(
        `${process.env.REACT_APP_BASE_URL}/product/`,
        {
          name: this.state.pname,
          slug: this.state.slug
        }
      );
      this.setState({
        ...this.state,
        pname: "",
        slug: "",
        success: true,
        products: [...this.state.products, data.data]
      });

      setTimeout(() => {
        this.setState({
          ...this.state,
          success: false
        });
      }, 2000);
    } catch (error) {
      this.setState({ ...this.state, perr: error.response.data.error });

      setTimeout(() => {
        this.setState({
          ...this.state,
          perr: null
        });
      }, 2000);
      console.log(error);
    }
  }

  handleClose = () => this.setState({ ...this.state, show: false });
  handleShow = e => {
    this.setState({
      ...this.state,
      show: true,
      deleteitem: e.details,
      deletetype: e.type
    });
  };

  async onPDelete() {
    try {
      await API.delete(
        `${process.env.REACT_APP_BASE_URL}/product/delete/${this.state.deleteitem._id}`
      );
      var rem = this.state.products.filter(product => {
        return product._id !== this.state.deleteitem._id;
      });

      this.setState({
        ...this.state,
        products: rem,
        deleteitem: null,
        deletetype: null
      });
      this.handleClose();
    } catch (error) {
      this.handleClose();
      console.log(error);
    }
  }

  async onCDelete() {
    try {
      await API.delete(
        `${process.env.REACT_APP_BASE_URL}/category/delete/${this.state.deleteitem._id}`
      );
      var rem = this.state.categories.filter(cat => {
        return cat._id !== this.state.deleteitem._id;
      });

      this.setState({
        ...this.state,
        categories: rem,
        deleteitem: null,
        deletetype: null
      });
      this.handleClose();
    } catch (error) {
      this.handleClose();
      console.log(error);
    }
  }

  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return <Redirect to="/login" />;
    }

    const {
      success,
      cerr,
      cname,
      pname,
      perr,
      products,
      categories,
      slug
    } = this.state;

    return (
      <div>
        <div className="container dash p-5">
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
          {success ? (
            <div className="alert alert-success" role="alert">
              Success
            </div>
          ) : (
            <div></div>
          )}

          <div className="row">
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form onSubmit={this.onProductSubmit}>
                    <div className="form-group">
                      <label>New Product</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New Product Name"
                        value={pname}
                        name="pname"
                        onChange={this.onChange}
                      />
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Enter slug"
                        value={slug}
                        name="slug"
                        onChange={this.onChange}
                      />
                      <div className="text-muted mt-1">{`${process.env.REACT_APP_CLIENT_URL}/qrcode/${slug}`}</div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  {perr ? (
                    <div className="alert alert-danger mt-2" role="alert">
                      {perr}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form onSubmit={this.onCategorySubmit}>
                    <div className="form-group">
                      <label>New Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cname}
                        name="cname"
                        onChange={this.onChange}
                        placeholder="Enter New Category Name"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  {cerr ? (
                    <div className="alert alert-danger mt-2" role="alert">
                      {cerr}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col pnclist">
              <ul class="list-group">
                {products.map(product => (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {product.name}
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        this.handleShow({ details: product, type: "product" });
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col pnclist">
              <ul class="list-group">
                {categories.map(category => (
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {category.name}
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        this.handleShow({
                          details: category,
                          type: "category"
                        });
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            Are you sure you want to delete "
            {this.state.deleteitem
              ? this.state.deleteitem.name + '" ' + this.state.deletetype
              : ""}
            ?
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
                if (this.state.deletetype === "product") this.onPDelete();
                else this.onCDelete();
              }}
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
