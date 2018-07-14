import React, {Component} from "react";
import axios from "axios";
import * as APP_CONF from "./conf.json";
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
        this.setState({notification: null, response: null});
    }

    setNotification(message, response) {
        this.resetNotification();
        this.setState({notification: message, response: response});
        setTimeout(() => {
            this.resetNotification();
        }, 5000);

    }

    /**
     * Submit form
     */
    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.fileUpload()
            .then(response => {
                this.setNotification('Fichier envoyé', 'ok');
                this.resetState();
            })
            .catch(response => {
                this.setNotification('Erreur lors de l\'envoi', 'ko');
                this.resetState();
            });
    }

    /**
     * Get file
     */
    onChange(e) {
        const file = e.target.files[0];
        const fileSplit = file.name.split('.');
        if (fileSplit[fileSplit.length - 1] !== 'torrent') {
            this.setNotification('Erreur de format', 'ko');
        } else {
            this.setState({file: file, type: e.target.name});
        }
    }

    /**
     * Send file
     * @returns {AxiosPromise<any>}
     */
    fileUpload() {
        const IP = APP_CONF.IP;
        const PORT = APP_CONF.PORT;
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