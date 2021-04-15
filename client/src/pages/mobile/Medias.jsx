import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "../../assets/footer.css";
import "../../assets/medias.css";
import "../../assets/category.css";

export default class Medias extends Component {
  constructor() {
    super();
    this.state = {
      medias: [],
      cname: null
    };
  }
  async componentDidMount() {
    try {
      this.setState({
        medias: this.props.location.state.media,
        cname: this.props.location.state.cname
      });
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
          <span className="navbar-brand"><img src={Logo} alt="img" width="80" height="60"/></span>
        </nav>
        <div className="mt-4 ml-3"><h4>{cname}</h4></div>
        <div className="category-list">
          {medias.map(e => (
            <Link
              to={{
                pathname: `/player/${e._id}`,
                state: {
                  details: e
                }
              }}
            >
              <div className="card mb-2">
                <div className="row">
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "black" }}>
                        {e.name}
                      </h5>
                    </div>
                  </div>
                  <div className="col">
                    <img
                      src={base_url + e.poster}
                      width="100%"
                      height="100"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
