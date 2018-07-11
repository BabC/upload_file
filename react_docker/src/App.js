import React, {Component} from "react";
/*
import Dropzone from 'react-dropzone';
*/
import axios from "axios";
/*
import logo from './logo.svg';
*/
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            type: null,
            response: null,
            notification: null
        };
        this.resetState = this.resetState.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    /**
     * Reset state
     */
    resetState() {
        this.setState({
            file: null,
            type: null
        });
    }

    resetNotification() {
        setTimeout(() => {
            this.setState({notification: null, response: null});
        }, 5000);
    }

    /**
     * Submit form
     */
    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.fileUpload()
            .then(response => {
                console.log(response.data);
                this.setState({notification: 'Fichier envoyé', response: 'ok'});
                this.resetNotification();
                this.resetState();
            })
            .catch(response => {
                console.log("Erreur", response);
                this.setState({notification: 'Erreur lors de l\'envoi', response: 'ko'});
                this.resetNotification();
                this.resetState();
            });
    }

    /**
     * Get file
     */
    onChange(e) {
        this.setState({file: e.target.files[0], type: e.target.name});
    }

    /**
     * Send file
     * @returns {AxiosPromise<any>}
     */
    fileUpload() {
        // console.log(process.env.TEST_KEY);
        const IP = 'localhost';
        const PORT = '8080';
        const typeFile = this.state.type === 'movieFile' ? '/upMovie' : '/upTVShow';

        const url = `http://${IP}:${PORT}${typeFile}`;
        const formData = new FormData();
        formData.append("file", this.state.file);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);
    }

    /**
     * Render HTML
     * @returns {*}
     */
    render() {
        const notificationClass = `notification ${this.state.response}`;

        return (
            <form onSubmit={this.onFormSubmit}>
                <div className={'title'}>Type de fichier</div>

                <input
                    className="input-file"
                    type="file"
                    id="movieFile"
                    name="movieFile"
                    onChange={this.onChange}
                />
                <label className="label-movie" htmlFor="movieFile">Film</label>

                <input
                    className="input-file tv-show"
                    type="file"
                    id="tvShowFile"
                    name="tvShowFile"
                    onChange={this.onChange}
                />
                <label className="label-tv-show" htmlFor="tvShowFile">Série</label>

                <button className={!this.state.file ? 'disable-link' : ''} type="submit"
                        disabled={!this.state.file}>Upload
                </button>
                {this.state.file && <div className={'file-name'}>{this.state.file.name}</div>}
                {this.state.notification && this.state.response &&
                <div className={notificationClass}>{this.state.notification}</div>}
            </form>

        );
    }

}

export default App;

/*
     
     https://react-dropzone.js.org/
     
     
       onDrop(files) {
    this.setState({
      files
    });
  }
     
     
     <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>*/
