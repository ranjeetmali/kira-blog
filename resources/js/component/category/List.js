import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as FaIcon from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {requestDeleteCategory, requestGetCategoryList} from "../../api/api";
import {CategoryDelete, CategoryList} from "../../action/CategoryAction";
import {toast} from "react-toastify";

class List extends Component {

    componentDidMount() {
        requestGetCategoryList().then((response) => {
            this.props.categoryList(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    DeleteHandler = (categoryId) => {
        requestDeleteCategory(categoryId).then((response) => {
            this.props.categoryDelete(categoryId);
            toast.error("Category Deleted");
        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        return <div className='row mt-4'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Categories
                            <div className='float-right'>
                                <Link to='/category/create' className='btn btn-success btn-sm'><FontAwesomeIcon
                                    icon={FaIcon.faPlus}/> Add New </Link>
                            </div>
                        </h4>
                    </div>
                    <div className="card-body p-0">
                        <table className='table mb-0'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.categories.map((category, index) => {
                                    return <tr key={index}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <Link
                                                to={{pathname: '/category/' + category.id + '/edit'}}
                                                className='btn btn-primary btn-sm mr-1'>
                                                <FontAwesomeIcon icon={FaIcon.faEdit}/>
                                            </Link>
                                            <button className='btn btn-danger btn-sm' onClick={() => {
                                                this.DeleteHandler(category.id)
                                            }}>
                                                <FontAwesomeIcon icon={FaIcon.faTrash}/>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
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
        categoryList: (categories) => {
            dispatch(CategoryList(categories))
        },
        categoryDelete: (categoryId) => {
            dispatch(CategoryDelete(categoryId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);