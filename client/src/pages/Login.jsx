import React, { Component } from "react";
import API from "../API";
import isEmpty from "../utils/isEmpty";
import getCurrentUser from "../utils/getCurrentUser";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    console.log("login", this.props.user);

    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push("/dashboard");
    } else this.props.history.push("/dashboard");
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const loginUser = this.state;
    try {
      const { data } = await API.post("/auth/login", loginUser);
      this.props.updateUser(data);
      this.props.history.push("/dashboard");
    } catch (error) {
      this.setState({...this.state, error: error.response.data.error});
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center dash p-3">
          <div class="card shadow p-3 mb-5 bg-white rounded">
            <div class="card-body">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="text"
                    name="username"
                    class="form-control"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </form>

              {error ? (
                <div class="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
