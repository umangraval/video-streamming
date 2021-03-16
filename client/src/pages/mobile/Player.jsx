import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/footer.css";
import "../../assets/medias.css";
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {}
    };
  }
  async componentDidMount() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/video/${this.state.videoId}/data`
      );
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-3">
          <div className="card border-0">
            <video controls autoPlay controlsList="nodownload">
            <source
              src={`${process.env.REACT_APP_BASE_URL}/media/video/${this.state.videoId}`}
              type="video/mp4"
            ></source>
          </video>
            {/* <img
              src="https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2020/07/16191441/Types-Of-Tiles-Ceramic.jpg"
              alt="img"
            /> */}
            <div class="card-body">
              <h5 class="card-title">Highlighter</h5>
              <h6 class="card-subtitle mb-2 text-muted">BathRoom</h6>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          {/* <h1>{this.state.videoData.name}</h1> */}
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
