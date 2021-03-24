import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "../../assets/footer.css";
import "../../assets/medias.css";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: this.props.location.state.details,
      type: null
    };
  }
  async componentDidMount() {
    try {
      this.state.details.filename.split(".")[1] === "mp4"
        ? this.setState({ type: "video" })
        : this.setState({ type: "image" });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { details, type } = this.state;
    const base_url = `${process.env.REACT_APP_BASE_URL}`;
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span className="navbar-brand"><img src={Logo} alt="img" width="80" height="60"/></span>
        </nav>
        <div className="container-fluid mt-3">
          <div className="card border-0">
            {type === "video" ? (
              <video controls autoPlay controlsList="nodownload">
                <source
                  src={`${process.env.REACT_APP_BASE_URL}/media/video/${this.state.details.filename}`}
                  type="video/mp4"
                ></source>
              </video>
            ) : (
              <img src={base_url + details.poster} alt="img" />
            )}
            <div className="card-body">
              <h5 className="card-title">{details.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {details.categoryname}
              </h6>
              <p className="card-text">{details.description}</p>
            </div>
          </div>
        </div>
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
          <div className="text-dark mt-2">Contact Us: 7088036665</div>
        </footer>
      </div>
    );
  }
}

export default withRouter(Player);
