import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
// import Upload from './Upload';

export default class Product extends Component {
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
      <div className="App App-header">
        <div className="container">
          <div className="row">
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
                      {/* <p>{video.duration}</p> */}
                    </div>
                  </div>
                
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}
