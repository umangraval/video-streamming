import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
        <div className="container-fluid mt-3">
          <div className="card border-0">
            {type === "video" ? (
            <video controls autoPlay controlsList="nodownload">
              <source
                src={`${process.env.REACT_APP_BASE_URL}/media/video/${this.state.details.filename}`}
                type="video/mp4"
              ></source>
            </video> ) : (
              <img
              src={base_url + details.poster}
              alt="img"
            />
            ) }
            {/* <img
              src="https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/07/16191441/Types-Of-Tiles-Ceramic.jpg"
              alt="img"
            /> */}
            <div class="card-body">
              <h5 class="card-title">{details.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {details.categoryname}
              </h6>
              <p class="card-text">{details.description}</p>
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
        </footer>
      </div>
      // <div>
      //     <header className="container">
      //         <video controls autoPlay controlsList="nodownload" >
      //             <source src={`${process.env.REACT_APP_BASE_URL}/media/video/${this.state.videoId}`} type="video/mp4"></source>
      //         </video>
      //         <h1>{ this.state.videoData.name }</h1>
      //         <button  onClick={() => { this.props.history.goBack() }}>Back</button>
      //     </header>
      // </div>
    );
  }
}

export default withRouter(Player);
