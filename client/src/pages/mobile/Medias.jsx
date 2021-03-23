import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
// import Upload from './Upload';
import "../../assets/footer.css";
import "../../assets/medias.css";
import "../../assets/category.css";

export default class Medias extends Component {
  constructor() {
    super();
    this.state = {
      medias: [],
      cname: null,
    };
  }
  async componentDidMount() {
    try {
      this.setState({ medias: this.props.location.state.media, cname: this.props.location.state.cname })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { medias, cname } = this.state;
    const base_url = `${process.env.REACT_APP_BASE_URL}`;
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span className="navbar-brand">{cname}</span>
        </nav>
        
        <div className="category-list">
        {medias.map(e => (
          <div className="card mb-2">
            <div className="row">
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                </div>
              </div>
              <div className="col">
                <img
                  src={base_url + e.poster}
                  width="100%"
                  height="100%"
                  alt="img"
                />
              </div>
            </div>
          </div>
          ))}
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
        <footer className="footer">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
        </footer>
      </div>
    );
  }
}
