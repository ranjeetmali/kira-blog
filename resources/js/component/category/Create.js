import React, {Component} from "react";
import {Link} from "react-router-dom";
import {requestCreateCategory} from "../../api/api";
import {connect} from "react-redux";
import {CategoryCreate} from "../../action/CategoryAction";
import {toast} from "react-toastify";

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            inputErrors: {
                nameError: ""
            }
        };
    }

    InputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    SubmitHandler = (event) => {
        event.preventDefault();
        requestCreateCategory({"name": this.state.name}).then((response) => {
            this.setState({
                name: "",
                inputErrors: {
                    nameError: ""
                }
            });
            this.props.categoryCreate(response.data.data);
            toast.success("Category Created");
            this.props.history.push("/category");
        }).catch((error) => {
            let errors = error.response.data.error;
            this.setState({
                inputErrors: {
                    nameError: errors.name
                }
            });
        });
    };

    render() {
        return <div className='row mt-4'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Create Category
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.SubmitHandler}>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter category name" name="name" value={this.state.name}
                                               onChange={this.InputHandler}/>
                                        <small
                                            className='text-danger'>{this.state.inputErrors.nameError}</small>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button type="submit" className="btn btn-primary mr-1">Submit</button>
                                    <Link className='btn btn-secondary' to='/category'>Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryCreate: (category) => {
            dispatch((CategoryCreate(category)));
        }
    }
};

export default connect(null,mapDispatchToProps)(Create)