import axios from 'axios';
import React,{Component} from 'react';
 
export default class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      msg: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value  });
  }
 

  async onSubmit(e) {
    try {
      e.preventDefault();
      if(!this.state.name) {
        this.setState({ ...this.state, msg: 'Product Name Needed'})
        return;
      }
      await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, { name: this.state.name });
      this.setState({
        name: '',
        msg: 'Success',
      });
      // this.props.history.push('/');
    } catch (error) {
      this.setState({ success: false });
      console.log(error);
    }
  }


    render() {
      const {
        name, msg
      } = this.state;
  
      return (
        <div className="upload">
        <h1>Upload New Product :</h1>
        <form className="upload__form" onSubmit={this.onSubmit}>
          <div className="upload__form__details">
            <input
            required
              type="text"
              className="upload__form__input"
              placeholder="Product Name"
              value={name}
              name="name"
              onChange={this.onChange}
            />
            <button type="submit" className="upload__form__submit">
                            UPLOAD
            </button>
          </div>
        </form>
        { msg ? (<h1>{msg}</h1>): (<></>)}
      </div>

      );
    }
  }
 