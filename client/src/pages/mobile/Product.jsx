import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
// import Upload from './Upload';
import "../../assets/footer.css";
import "../../assets/category.css";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      medias: [],
      pname: null,
      pid: null,
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
      this.setState({ ...this.state, pid: id, pname: product.name, medias: group });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { pname, medias, pid } = this.state;
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span class="navbar-brand">{pname}</span>
        </nav>
        <div className="category-list">
          <ul class="list-group">
          {Object.keys(medias).map(e => (
            <Link to={{
              pathname: `/media/${pid}`,
              state: {
                media: medias[e],
                cname: e
              }
              }}>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              {e}
              <span class="badge badge-primary badge-pill">{medias[e].length}</span>
            </li>
            </Link>
            ))}
            </ul>
        </div>

        {/* <div className="row">
            {this.state.videos.map(video => (
              <div className="col-md-4" key={video._id}>
                  <div className="card border-0">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${video.poster}`}
                      alt={video.name}
                    />
                    <div className="card-body">
                    <Link to={`/player/${video.filename}`}>
                      <p>{video.name}</p>
                      </Link>
                      <div
                        onClick={() => {
                          this.onDelete({
                            _id: video._id
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
          </div> */}
        {/* <footer className="footer">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Back
            </button>
        </footer> */}
      </div>
    );
  }
}
