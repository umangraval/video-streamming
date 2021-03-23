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
      medias: []
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/videos/${this.props.match.params.id}`
      );
      const data = await response.json();
      console.log(data);
      this.setState({ medias: [...data] });
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
        <nav class="navbar sticky-top navbar-light bg-light one-edge-shadow">
  <span class="navbar-brand">Kajaria</span>
</nav>
        <div className="category-list">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              BathRoom
              <span class="badge badge-primary badge-pill">4</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Kitchen
              <span class="badge badge-primary badge-pill">2</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Living Room
              <span class="badge badge-primary badge-pill">1</span>
            </li>
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
