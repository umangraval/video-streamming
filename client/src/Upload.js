import axios from 'axios';
 
import React,{Component} from 'react';
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      progress: null,
      productId: '',
      file: {},
      success: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpdateHandler = this.fileUpdateHandler.bind(this);
    // this.progressHandler = this.progressHandler.bind(this);
    // this.deleteHandler = this.deleteHandler.bind(this);

  }

    
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.productId]: e.target.value });
  }

  async onSubmit(e) {
    try {
      e.preventDefault();
      // console.log(this.state.file);
      // if (!this.state.file.name) return;
      const fileData = new FormData();
      fileData.append('name', this.state.name);
      fileData.append('productId', this.state.productId);
      fileData.append('file', this.state.file);
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, fileData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
      console.log(data);
      this.setState({
        name: '',
        file: {},
        productId: '',
        progress: null,
        success: true,
      });
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
      const {
        name, file, productId, success
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
              type="file"
              id="filefield"
              className="upload__media--input"
              onChange={this.fileUpdateHandler}
            />
          </div>
          <div className="upload__form__details">
            <input
              type="text"
              className="upload__form__input"
              placeholder="Media Name"
              value={name}
              name="name"
              onChange={this.onChange}
            />
            <input
              type="text"
              className="upload__form__input"
              placeholder="Product ID"
              value={productId}
              name="productId"
              onChange={this.onChange}
            />
            <br />
            <button type="submit" className="upload__form__submit">
                            UPLOAD
            </button>
          </div>
        </form>
        { success ? (<h1>Success</h1>): (<></>)}
      </div>

      );
    }
  }
 
  export default App;