import Select from 'react-select';
import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import isEmpty from '../utils/isEmpty';
import API from '../API'; 
import axios from 'axios';
class Upload extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      progress: null,
      productId: null,
      categoryname: null,
      products: [],
      categories: [],
      file: {},
      msg: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpdateHandler = this.fileUpdateHandler.bind(this);

  }

  async componentDidMount() {
    // console.log('upload', this.props.user);
    try {
        const presponse = await fetch(`${process.env.REACT_APP_BASE_URL}/product/products`);
        const pdata = await presponse.json();
        this.setState({ ...this.state, products: [...pdata] });
        const cresponse = await fetch(`${process.env.REACT_APP_BASE_URL}/category/categories`);
        const cdata = await cresponse.json();
        this.setState({ ...this.state, categories: [...cdata] });
    } catch (error) {
        console.log(error);
    }
} 

  onChange(e) {
    // this.setState({ name: e.target.value });
    this.setState({ [e.target.name]: e.target.value  });
  }
  
  async handleSelectChange(e) {
    // console.log({ [e.name]: e.value });
    this.setState({ [e.name]: e.value });
    console.log({[e.name]: e.value});
  }

  async logout() {
    await API.post(`/auth/logout`).then((res) => {
      if (res.status === 200) {
        this.props.updateUser(undefined);
      }
    }).catch((error) => {
      console.log('Logout error', error);
    });
  };



  async onSubmit(e) {
    try {
      e.preventDefault();
      // console.log(this.state.file);
      if(!this.state.productId) {
        this.setState({ ...this.state, msg: 'Product Needed'})
        return;
      }
      console.log(this.state);
      if (!this.state.file.name) return;
      const fileData = new FormData();
      fileData.append('name', this.state.name);
      fileData.append('productId', this.state.productId);
      fileData.append('categoryname', this.state.categoryname);
      fileData.append('file', this.state.file);
      const { data } = await API.post(`${process.env.REACT_APP_BASE_URL}/media/upload`, fileData, {headers: {
        'Content-Type': 'multipart/form-data'
      }});
      console.log(data);
      this.setState({
        ...this.state,
        name: '',
        file: {},
        productId: null,
        categoryname: null,
        progress: null,
        msg: 'Success',
      });
      // this.props.history.push('/');
    } catch (error) {
      this.setState({ success: false });
      console.log(error);
    }
  }

  // progressHandler(progressEvent) {
  //   this.setState({
  //     progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
  //   });
  // }

  async fileUpdateHandler(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.type.match(/video/i)) {
        if (this.state.videoPreview !== e.target.result) {
          this.setState({ videoPreview: e.target.result });
          // preview.style.background = '#eee';
        }
      } else {
        // preview.style.background = `#eee url('${e.target.result}')`;
        // preview.style.backgroundSize = 'contain';
        // preview.style.backgroundRepeat = 'no-repeat';
        // preview.style.backgroundPosition = 'center';
      }
      this.setState({ file });
    };
    reader.readAsDataURL(file);
  }


    render() {
      const { user } = this.props;
      if (isEmpty(user)) {
        return <Redirect to="/login" />;
      }
    
      const {
        name, file, msg, products, categories
      } = this.state;
      
      return (
        <div className="upload">
        <h1>Upload New Media :</h1>
        <form className="upload__form" onSubmit={this.onSubmit}>
          <div className="upload__media">
            <label htmlFor="filefield" className="upload__media--label">
              {/* {isEmpty(progress) ? null : (
                <div className="upload__loader--wrapper">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress} %`}
                    styles={buildStyles({
                      strokeLinecap: 'butt',
                      pathColor: '#2751f8',
                      textColor: '#2751f8',
                      trailColor: '#ddd',
                      backgroundColor: '#2751f8',
                    })}
                    className="upload__loader"
                  />
                </div>
              )} */}
              {file.name ? 'Select a file to upload' : null}
              {/* {!file.name && file.type.match(/video/i) ? (
                <ReactPlayer
                  url={videoPreview}
                  className="upload__media__previewVideo"
                  width="100%"
                  height="100%"
                  playing
                  loop
                  muted
                />
              ) : null} */}
            </label>
            <input
            required
              type="file"
              id="filefield"
              className="upload__media--input"
              onChange={this.fileUpdateHandler}
            />
          </div>
          <div className="upload__form__details">
            <input
            required
              type="text"
              className="upload__form__input"
              placeholder="Media Name"
              value={name}
              name="name"
              onChange={this.onChange}
            />
             <Select
             options={products.map((p) => {
              return {
                label: p.name,
                value: p._id,
                name: "productId",
              };
            })}
            defaultValue={{ label: "Select Product", value: 0 }}
              name="productId"
              onChange={this.handleSelectChange}/>
            <br />
            <Select
             options={categories.map((p) => {
              return {
                label: p.name,
                value: p.name,
                name: "categoryname",
              };
            })}
            defaultValue={{ label: "Select Category", value: 0 }}
              name="categoryname"
              onChange={this.handleSelectChange}/>
            <br />
            <button type="submit" className="upload__form__submit">
                            UPLOAD
            </button>
          </div>
        </form>
        <button onClick={() => {this.logout()}}>
                            Logout
            </button>
        { msg ? (<h1>{msg}</h1>): (<></>)}
      </div>

      );
    }
  }
 
  export default Upload;