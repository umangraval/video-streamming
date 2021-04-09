import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Logo from "../../assets/img/logo.png";
import "../../assets/footer.css";
import "../../assets/category.css";

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      medias: [],
      pname: null,
      pid: null,
      loader: true
    };
  }
  async componentDidMount() {
    try {
      var textWrapper = document.querySelector(".ml2");
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      window.anime
        .timeline({ loop: true })
        .add({
          targets: ".ml2 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 4000,
          delay: (el, i) => 200 * i
        })
        .add({
          targets: ".ml2",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 2000
        });
      setTimeout(() => {
        this.setState({
          ...this.state,
          loader: false
        });
      }, 3000);
      const { id } = this.props.match.params;
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/qrcode/${id}`
      );
      const product = await res.json();
      // console.log(product);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/media/medias/${product._id}`
      );
      const data = await response.json();
      console.log(data);
      let group = data.reduce((r, a) => {
        r[a.categoryname] = [...(r[a.categoryname] || []), a];
        return r;
      }, {});
      // console.log(group);
      this.setState({
        ...this.state,
        pid: product._id,
        pname: product.name,
        medias: group
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { pname, medias, pid, loader } = this.state;
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light one-edge-shadow">
          <span className="navbar-brand">
            <img src={Logo} alt="img" width="80" height="60" />
          </span>
        </nav>
        {loader ? (
          <Loader />
        ) : (
          <>
            {pname ? (
              <>
                <div className="mt-4 ml-3">
                  <h4>{pname}</h4>
                </div>
                {Object.keys(medias).length > 0 ? (
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
                ) : (
                  <div className="m-4 text-center text-secondary">
                    <h3>No Media</h3>
                  </div>
                )}
              </>
            ) : (
              <div className="m-4 text-center text-secondary">
                <h3>No Product</h3>
              </div>
            )}
            <footer className="footer">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  window.location = "https://www.the-qrcode-generator.com/scan";
                }}
              >
                Scanner
              </button>
              <div className="text-dark mt-2">Contact Us: 7088036665</div>
            </footer>
          </>
        )}
      </div>
    );
  }
}
