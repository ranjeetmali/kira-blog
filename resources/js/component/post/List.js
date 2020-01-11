import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as FaIcon from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {requestDeletePost, requestGetPostList} from "../../api/api";
import {connect} from "react-redux";
import {PostDelete, PostList} from "../../action/PostAction";
import {toast} from "react-toastify";

class List extends Component {

    componentDidMount() {
        requestGetPostList().then((response) => {
            this.props.postList(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    DeleteHandler = (postId) => {
        requestDeletePost(postId).then((response) => {
            this.props.postDelete(postId);
            toast.error("Post Deleted");
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
                            Blogs
                            <div className='float-right'>
                                <Link to='/blog/create' className='btn btn-success btn-sm'><FontAwesomeIcon
                                    icon={FaIcon.faPlus}/> Add New </Link>
                            </div>
                        </h4>
                    </div>
                    <div className="card-body p-0">
                        <table className='table mb-0'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.posts.map((post, index) => {
                                    return <tr key={index}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.category.name}</td>
                                        <td>
                                            {(post.status === 'PUBLISH') ?
                                                <label className='badge badge-success'>{post.status}</label> :
                                                <label className='badge badge-secondary'>{post.status}</label>}
                                        </td>
                                        <td>
                                            {post.created_at}
                                        </td>
                                        <td>
                                            <Link
                                                to={{pathname: '/blog/' + post.id}}
                                                className='btn btn-secondary btn-sm mr-1'>
                                                <FontAwesomeIcon icon={FaIcon.faEye}/>
                                            </Link>
                                            <Link
                                                to={{pathname: '/blog/' + post.id + '/edit'}}
                                                className='btn btn-primary btn-sm mr-1'>
                                                <FontAwesomeIcon icon={FaIcon.faEdit}/>
                                            </Link>
                                            <button className='btn btn-danger btn-sm' onClick={() => {
                                                this.DeleteHandler(post.id)
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
        posts: state.PostReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postList: (posts) => {
            dispatch(PostList(posts))
        },
        postDelete: (postId) => {
            dispatch(PostDelete(postId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
