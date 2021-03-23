import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Qrcode from "../components/Qrcode";
import isEmpty from "../utils/isEmpty";
export default class Home extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     products: []
  //   };
  // }
  // async componentDidMount() {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/product/products`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     this.setState({ products: [...data] });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="dash p-3">
        <div className="row opt">
          <div className="col">
            <Link to="/up">
              <button
                type="button"
                class="btn btn-outline-primary btn-lg btn-block dash-btn"
              >
                Upload
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/manage">
              <button
                type="button"
                class="btn btn-outline-info btn-lg btn-block dash-btn"
              >
                Manage
              </button>
            </Link>
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
