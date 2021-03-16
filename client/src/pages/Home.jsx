import React, { Component } from "react";
import { Link } from "react-router-dom";
import Qrcode from "../components/Qrcode";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: []
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
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-light bg-light one-edge-shadow">
          <div className="container-fluid w-75">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                RSDecor
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="container">
          <div className="row">
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
          </div>
        </div> */}
        <div className="d-flex justify-content-center align-items-center dash">
        <div class="card shadow p-3 mb-5 bg-white rounded">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
