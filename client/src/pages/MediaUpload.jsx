import Select from "react-select";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import API from "../API";
export default class MediaUpload extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      progress: null,
      productId: null,
      categoryname: null,
      description: "",
      products: [],
      categories: [],
      file: {},
      msg: null,
      cerr: null,
      perr: null,
      uerr: null,
      cname: "",
      pname: "",
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onProductSubmit = this.onProductSubmit.bind(this);
    this.onCategorySubmit = this.onCategorySubmit.bind(this);
    this.fileUpdateHandler = this.fileUpdateHandler.bind(this);
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

  async handleSelectChange(e) {
    this.setState({ [e.name]: e.value });
    console.log({ [e.name]: e.value });
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
      this.setState({ ...this.state, success: false });
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
            cerr: null
          });
        }, 2000);

        return;
      }
      const data = await API.post(
        `${process.env.REACT_APP_BASE_URL}/product/`,
        {
          name: this.state.pname
        }
      );
      this.setState({
        ...this.state,
        pname: "",
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
      this.setState({ ...this.state, success: false });
      console.log(error);
    }
  }

  async onSubmit(e) {
    try {
      e.preventDefault();

      if (!this.state.name) {
        this.setState({ ...this.state, uerr: "Media Name Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            uerr: null
          });
        }, 2000);
        return;
      }
      if (!this.state.productId) {
        this.setState({ ...this.state, uerr: "Product Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            uerr: null
          });
        }, 2000);
        return;
      }
      if (!this.state.categoryname) {
        this.setState({ ...this.state, uerr: "Category Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            uerr: null
          });
        }, 2000);
        return;
      }
      if (!this.state.file.name) {
        this.setState({ ...this.state, uerr: "Media File Needed" });

        setTimeout(() => {
          this.setState({
            ...this.state,
            uerr: null
          });
        }, 2000);
        return;
      }

      const fileData = new FormData();
      fileData.append("name", this.state.name);
      fileData.append("productId", this.state.productId);
      fileData.append("categoryname", this.state.categoryname);
      fileData.append("description", this.state.description);
      fileData.append("file", this.state.file);
      const { data } = await API.post(
        `${process.env.REACT_APP_BASE_URL}/media/upload`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(data);
      this.setState({
        ...this.state,
        name: "",
        file: {},
        productId: null,
        categoryname: null,
        description: "",
        success: true
      });

      setTimeout(() => {
        this.setState({
          ...this.state,
          success: false
        });
      }, 2000);
    } catch (error) {
      this.setState({ success: false });
      console.log(error);
    }
  }

  // progressHandler(progressEvent) {
  //   this.setState({
  //     progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
  //   });
  // }

  async fileUpdateHandler(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      if (file.type.match(/video/i)) {
        if (this.state.videoPreview !== e.target.result) {
          this.setState({ videoPreview: e.target.result });
          // preview.style.background = '#eee';
        }
      } else {
        // preview.style.background = `#eee url('${e.target.result}')`;
        // preview.style.backgroundSize = 'contain';
        // preview.style.backgroundRepeat = 'no-repeat';
        // preview.style.backgroundPosition = 'center';
      }
      this.setState({ file });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return <Redirect to="/login" />;
    }

    const {
      success,
      name,
      cerr,
      cname,
      pname,
      perr,
      uerr,
      products,
      categories,
      description
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
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label>Media Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Media Name"
                            value={name}
                            name="name"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Upload Media</label>
                          <input
                            className="form-control-file"
                            type="file"
                            id="filefield"
                            onChange={this.fileUpdateHandler}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label>Select Product</label>
                          {/* <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select> */}
                          <Select
                            options={products.map(p => {
                              return {
                                label: p.name,
                                value: p._id,
                                name: "productId"
                              };
                            })}
                            defaultValue={{ label: "Select Product", value: 0 }}
                            name="productId"
                            onChange={this.handleSelectChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleFormControlSelect2">
                            Select Category
                          </label>
                          {/* <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select> */}
                          <Select
                            options={categories.map(c => {
                              return {
                                label: c.name,
                                value: c.name,
                                name: "categoryname"
                              };
                            })}
                            defaultValue={{
                              label: "Select Category",
                              value: 0
                            }}
                            name="categoryname"
                            onChange={this.handleSelectChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        name="description"
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Upload
                    </button>
                  </form>
                  {uerr ? (
                    <div className="alert alert-danger mt-2" role="alert">
                      {uerr}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
