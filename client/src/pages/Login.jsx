import React, { Component } from "react";
import API from '../API';
import isEmpty from '../utils/isEmpty';
import getCurrentUser from '../utils/getCurrentUser';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  async componentDidMount() {
    console.log('login', this.props.user);
    
    if (isEmpty(this.props.user)) {
      const currentUser = await getCurrentUser();
      this.props.updateUser(currentUser);
      if (!isEmpty(currentUser)) this.props.history.push('/upload');
    } else this.props.history.push('/upload');
  }

  redirect() {
    this.props.history.push("/signup");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const loginUser = this.state;
    try {
      const { data } = await API.post('/auth/login', loginUser);
      this.props.updateUser(data);
      this.props.history.push("/upload");
    } catch (error) {
      this.props.setError(error);
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center dash p-3">
          <div class="card shadow p-3 mb-5 bg-white rounded">
            <div class="card-body">
              <form action="/dashboard">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      // <div className="Form--Login">
      //   <form onSubmit={this.handleSubmit}>
      //     <div className="form-group">
      //       <input
      //         type="text"
      //         name="username"
      //         id="username"
      //         placeholder="Username"
      //         value={this.state.username}
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <input
      //         type="password"
      //         name="password"
      //         id="password"
      //         placeholder="Password"
      //         value={this.state.password}
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <button title="Login" type="submit"> Submit </button>
      //   </form>
      // </div>
    );
  }
}
