import axios from "axios";
import React, { Component } from "react";
import API from "../API";
import Card from "../components/Card";

export default class NewCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      msg: null,
      categories: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
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

  async onSubmit(e) {
    try {
      e.preventDefault();
      if (!this.state.name) {
        this.setState({ ...this.state, msg: "Category Name Needed" });
        return;
      }
      const data = await API.post(
        `${process.env.REACT_APP_BASE_URL}/category/`,
        { name: this.state.name }
      );
      this.setState({
        name: "",
        msg: "Success",
        categories: [...this.state.categories, data.data]
      });
      // this.props.history.push('/');
    } catch (error) {
      this.setState({ success: false });
      console.log(error);
    }
  }

  async onDelete(e) {
    try {
      await API.delete(
        `${process.env.REACT_APP_BASE_URL}/category/delete/${e._id}`
      );
      this.setState({
        ...this.state,
        categories: this.state.categories.filter(function(category) {
          return category._id !== e._id;
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, msg, categories } = this.state;

    return (
      <div>
        <div className="upload">
          <h1>Upload New Category :</h1>
          <form className="upload__form" onSubmit={this.onSubmit}>
            <div className="upload__form__details">
              <input
                required
                type="text"
                className="upload__form__input"
                placeholder="Category Name"
                value={name}
                name="name"
                onChange={this.onChange}
              />
              <button type="submit" className="upload__form__submit">
                UPLOAD
              </button>
            </div>
          </form>
          {msg ? <h1>{msg}</h1> : <></>}
        </div>
        <h2>All categories</h2>
        {categories.map(e => (
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <div
                  onClick={() => {
                    this.onDelete({
                      _id: e._id
                    });
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
