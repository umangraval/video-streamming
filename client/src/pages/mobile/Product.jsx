import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/footer.css";
import "../../assets/category.css";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      medias: [],
      pname: null,
      pid: null
    };
  }
  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/${id}`
      );
      const product = await res.json();
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/medias/${id}`
      );
      const data = await response.json();
      console.log(data);
      let group = data.reduce((r, a) => {
        r[a.categoryname] = [...(r[a.categoryname] || []), a];
        return r;
      }, {});
      console.log(group);
      this.setState({
        ...this.state,
        pid: id,
        pname: product.name,
        medias: group
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { pname, medias, pid } = this.state;
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span className="navbar-brand">{pname}</span>
        </nav>
        <div className="category-list">
          <ul className="list-group">
            {Object.keys(medias).map(e => (
              <Link
                to={{
                  pathname: `/media/${pid}`,
                  state: {
                    media: medias[e],
                    cname: e
                  }
                }}
              >
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ color: "black" }}
                >
                  {e}
                  <span className="badge badge-primary badge-pill">
                    {medias[e].length}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
