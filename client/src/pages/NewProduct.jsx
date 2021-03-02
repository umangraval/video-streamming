import axios from 'axios';
import React,{Component} from 'react';
import API from '../API';
import Card from '../components/Card';
 
export default class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      msg: null,
      products: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  async componentDidMount() {
    try {
        const presponse = await fetch(`${process.env.REACT_APP_BASE_URL}/product/products`);
        const pdata = await presponse.json();
        this.setState({ ...this.state, products: [...pdata] });
    } catch (error) {
        console.log(error);
    }
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
      await API.post(`${process.env.REACT_APP_BASE_URL}/product/`, { name: this.state.name });
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
        name, msg, products
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
        <h2>All Products</h2>
        {
          products.map(e => 
            <Card name={e.name} />
          )
        }
      </div>

      );
    }
  }
 