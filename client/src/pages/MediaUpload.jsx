import Select from "react-select";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import isEmpty from "../utils/isEmpty";
import API from "../API";
import axios from "axios";
export default class MediaUpload extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      progress: null,
      productId: null,
      categoryname: null,
      products: [],
      categories: [],
      file: {},
      msg: null
    };
    this.onChange = this.onChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpdateHandler = this.fileUpdateHandler.bind(this);
  }

  async componentDidMount() {
    // console.log('upload', this.props.user);
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
    // this.setState({ name: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSelectChange(e) {
    // console.log({ [e.name]: e.value });
    this.setState({ [e.name]: e.value });
    console.log({ [e.name]: e.value });
  }

  async logout() {
    await API.post(`/auth/logout`)
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser(undefined);
        }
      })
      .catch(error => {
        console.log("Logout error", error);
      });
  }

  async onSubmit(e) {
    try {
      e.preventDefault();
      // console.log(this.state.file);
      if (!this.state.productId) {
        this.setState({ ...this.state, msg: "Product Needed" });
        return;
      }
      console.log(this.state);
      if (!this.state.file.name) return;
      const fileData = new FormData();
      fileData.append("name", this.state.name);
      fileData.append("productId", this.state.productId);
      fileData.append("categoryname", this.state.categoryname);
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
        progress: null,
        msg: "Success"
      });
      // this.props.history.push('/');
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
    // const { user } = this.props;
    // if (isEmpty(user)) {
    //   return <Redirect to="/login" />;
    // }

    const { name, file, msg, products, categories } = this.state;

    return (
      <div>
        <div className="container dash p-5">
          <div className="row">
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form action="/dashboard">
                    <div className="form-group">
                      <label for="exampleInputEmail1">New Product</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter New Product Name"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form action="/dashboard">
                    <div className="form-group">
                      <label for="exampleInputEmail1">New Category</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter New Category Name"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <form action="/dashboard">
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">Media Name</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Media Name"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleFormControlFile1">
                            Upload Media
                          </label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="exampleFormControlFile1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleFormControlSelect2">
                            Select Product
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleFormControlSelect2">
                            Select Category
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlTextarea1">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
