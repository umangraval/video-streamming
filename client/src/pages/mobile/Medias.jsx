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
      videos: []
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/videos/${this.props.match.params.id}`
      );
      const data = await response.json();
      console.log(data);
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  async onDelete(e) {
    try {
      await API.delete(
        `${process.env.REACT_APP_BASE_URL}/media/delete/${e._id}`
      );
      this.setState({
        ...this.state,
        videos: this.state.videos.filter(function(video) {
          return video._id !== e._id;
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span className="navbar-brand">BathRoom</span>
        </nav>

        <div className="category-list">
          <div className="card mb-2">
            <div className="row">
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">Highlighter</h5>
                </div>
              </div>
              <div className="col">
                <img
                  src="https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/07/16191441/Types-Of-Tiles-Ceramic.jpg"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="card mb-2">
          <div className="row">
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">Flooring</h5>
                </div>
              </div>
              <div className="col">
                <img
                  src="https://www.supergres.com/images/stories/flexicontent/m_anteprima_brecce_bagno-riv-5.jpg"
                  alt="img"
                />
              </div>
            </div>
          </div>
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
