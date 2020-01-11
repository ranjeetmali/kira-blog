import React, {Component} from "react";
import {requestChangePassword, requestGetUser, requestProfileUpdate, requestProfileUpload} from "../api/api";
import {toast} from "react-toastify";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            profileImg: "",
            profileImgUrl: "",
            currentPassword: "",
            newPassword: "",
            conformPassword: "",
            inputErrors: {
                nameError: "",
                currentPasswordError: "",
                newPasswordError: "",
                conformPasswordError: "",
                profileImgError: "",
            }
        };
    }

    componentDidMount() {
        requestGetUser().then(response => {
            let user = response.data;
            this.setState({
                name: user.name,
                profileImgUrl: user.profile_img_url
            });
        }).catch(error => {
            console.log(error);
        });
    }

    InputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    ImageInputHandler = (event) => {
        this.setState({profileImg: event.target.files[0]});
    };

    ProfileUploadSubmitHandler = (event) => {
        event.preventDefault();

        let frmDt = new FormData();
        frmDt.append('profile', this.state.profileImg);
        frmDt.set('_method', 'PUT');
        requestProfileUpload(frmDt).then((response) => {
            console.log(response.data);
            this.setState({
                profileImgUrl: response.data.data.profile_img_url,
                inputErrors: {
                    nameError: "",
                    currentPasswordError: "",
                    newPasswordError: "",
                    conformPasswordError: "",
                    profileImgError: "",
                }
            });
            toast.success("Profile image uploaded successfully");
            this.props.history.push("/profile");
        }).catch((error) => {
            let errors = error.response.data.error;
            this.setState({
                inputErrors: {
                    profileImgError: errors.profile,
                }
            });
        });
    };

    GeneralSubmitHandler = (event) => {
        event.preventDefault();

        requestProfileUpdate({
            "name": this.state.name,
        }).then((response) => {
            this.setState({
                currentPassword: "",
                newPassword: "",
                conformPassword: "",
                inputErrors: {
                    nameError: "",
                    currentPasswordError: "",
                    newPasswordError: "",
                    conformPasswordError: "",
                    profileImgError: "",
                }
            });
            toast.success("Password change successfully");
            //this.props.history.push("/profile");
        }).catch((error) => {
            let errors = error.response.data.error;
            console.log(errors);
            this.setState({
                inputErrors: {
                    nameError: errors.name,
                }
            });
        });
    };

    ChangePasswordSubmitHandler = (event) => {
        event.preventDefault();

        requestChangePassword({
            "current_password": this.state.currentPassword,
            "new_password": this.state.newPassword,
            "conform_password": this.state.conformPassword,
        }).then((response) => {
            this.setState({
                currentPassword: "",
                newPassword: "",
                conformPassword: "",
                inputErrors: {
                    nameError: "",
                    currentPasswordError: "",
                    newPasswordError: "",
                    conformPasswordError: "",
                    profileImgError: "",
                }
            });
            toast.success("Password change successfully");
            //this.props.history.push("/profile");
        }).catch((error) => {
            let errors = error.response.data.error;
            console.log(errors);
            this.setState({
                inputErrors: {
                    currentPasswordError: errors.current_password,
                    newPasswordError: errors.new_password,
                    conformPasswordError: errors.conform_password,
                }
            });
        });
    };

    render() {
        return <div className="row">
            <div className='col-sm-4 mt-4'>
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>
                            Profile
                        </h4>
                    </div>
                    <div className='card-body text-center'>
                        <form onSubmit={this.ProfileUploadSubmitHandler}>
                            <img src={this.state.profileImgUrl} className='profile'
                                 alt='profile'/>
                            <br/><br/>
                            <input type='file' name='profileImg' className='form-control'
                                   onChange={this.ImageInputHandler}/>
                            <small className='text-danger'>{this.state.inputErrors.profileImgError}</small>
                            <br/>
                            <button type='submit' className='btn btn-primary'>Upload</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='col-sm-8 mt-4'>
                <div className='card'>
                    <div className='card-header'>
                        <ul className="nav nav-pills" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="pill" href="#general">General</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="pill" href="#change-password">Change Password</a>
                            </li>
                        </ul>
                    </div>
                    <div className='card-body'>
                        <div className="tab-content">
                            <div id="general" className="container tab-pane active"><br/>
                                <form onSubmit={this.GeneralSubmitHandler}>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control"
                                                       placeholder="Enter Name" value={this.state.name}
                                                       name="name" onChange={this.InputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.nameError}</small>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <button type="submit" className="btn btn-primary">Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div id="change-password" className="container tab-pane fade"><br/>
                                <form onSubmit={this.ChangePasswordSubmitHandler}>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className="form-group">
                                                <label>Current Password</label>
                                                <input type="password" className="form-control"
                                                       placeholder="Enter current password"
                                                       value={this.state.currentPassword}
                                                       name="currentPassword" onChange={this.InputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.currentPasswordError}</small>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="form-group">
                                                <label>New Password</label>
                                                <input type="password" className="form-control"
                                                       placeholder="Enter new password"
                                                       value={this.state.newPassword}
                                                       name="newPassword" onChange={this.InputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.newPasswordError}</small>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="form-group">
                                                <label>Conform Password</label>
                                                <input type="password" className="form-control"
                                                       placeholder="Enter conform password"
                                                       value={this.state.conformPassword}
                                                       name="conformPassword" onChange={this.InputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.newPasswordError}</small>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <button type="submit" className="btn btn-primary">Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Profile;