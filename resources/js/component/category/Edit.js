import React, {Component} from "react";
import {Link} from "react-router-dom";
import {requestGetCategory, requestUpdateCategory} from "../../api/api";
import {connect} from "react-redux";
import {CategoryUpdate} from "../../action/CategoryAction";
import {toast} from "react-toastify";

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.categoryId,
            name: "",
            inputErrors: {
                nameError: ""
            }
        };
    }

    componentDidMount() {
        requestGetCategory(this.state.id).then(response => {
            let category=response.data;
            this.setState({name:category.name});
        }).catch(error => {
            console.log(error);
        });
    }

    InputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    SubmitHandler = (event) => {
        event.preventDefault();
        requestUpdateCategory(this.state.id,{"name": this.state.name}).then((response) => {
            this.setState({
                name: "",
                inputErrors: {
                    nameError: ""
                }
            });
            this.props.categoryUpdate(response.data.data);
            toast.success("Category Updated");
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
                            Edit Category
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

const mapStateToProps = (state) => {
    return {
        categories: state.CategoryReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        categoryUpdate: (category) => {
            dispatch((CategoryUpdate(category)));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit)