import React, {Component} from "react";
import {Link} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {requestCreatePost, requestGetCategoryList, requestGetPostStatus} from "../../api/api";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {PostCreate} from "../../action/PostAction";

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            categoryId: "",
            status: "",
            content: "",
            featuredImg: "",
            featuredImgPreview: "https://dummyimage.com/600x400/b6b7b8/695669.jpg&text=Preview+here",
            inputErrors: {
                titleError: "",
                categoryIdError: "",
                statusError: "",
                contentError: "",
                featuredImgError: ""
            },
            statusList: [],
            categoryList: []
        };
    }

    componentDidMount() {
        requestGetCategoryList().then(response => {
            this.setState({categoryList: response.data});
        }).catch(error => {
            console.log(error);
        });

        requestGetPostStatus().then(response => {
            this.setState({status: response.data[0], statusList: response.data});
        }).catch(error => {
            console.log(error);
        });
    }

    InputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    ImageInputHandler = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            this.setState({
                featuredImgPreview: [reader.result],
                featuredImg: file
            })
        };
    };

    CKEditorInputHandler = (event, editor) => {
        let text = editor.getData();
        this.setState({content: text});
    };

    SubmitHandler = (event) => {
        event.preventDefault();

        let frmDt = new FormData();
        frmDt.append('featured_img', this.state.featuredImg);
        frmDt.append("title", this.state.title);
        frmDt.append("category_id", this.state.categoryId);
        frmDt.append("status", this.state.status);
        frmDt.append("content", this.state.content);

        requestCreatePost(frmDt).then((response) => {
            this.props.postCreate(response.data.data);
            toast.success("Post Created");
            this.props.history.push("/blog");
        }).catch((error) => {
            let errors = error.response.data.error;
            this.setState({
                inputErrors: {
                    titleError: errors.title,
                    categoryIdError: errors.category_id,
                    statusError: errors.status,
                    contentError: errors.content,
                    featuredImgError: errors.featured_img
                }
            });
        });
    };

    render() {
        return <div className='row mt-4'>
            <div className='col-sm-12'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Create Blog
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.SubmitHandler}>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input type="text" className="form-control"
                                                       placeholder="Enter title" value={this.state.title}
                                                       name="title" onChange={this.InputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.titleError}</small>
                                            </div>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select className='form-control' value={this.state.categoryId}
                                                        name='categoryId'
                                                        onChange={this.InputHandler}>
                                                    <option>- select category -</option>
                                                    {
                                                        this.state.categoryList.map((category, index) => {
                                                            return <option key={index}
                                                                           value={category.id}>{category.name}</option>
                                                        })
                                                    }
                                                </select>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.categoryIdError}</small>
                                            </div>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select className='form-control' name='status' value={this.state.status}
                                                        onChange={this.InputHandler}>
                                                    {
                                                        this.state.statusList.map((status, index) => {
                                                            return <option key={index}
                                                                           value={status}>{status}</option>
                                                        })
                                                    }
                                                </select>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.statusError}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className="form-group">
                                                <label>Featured Image</label>
                                                <input type='file' name='featuredImg' className='form-control'
                                                       onChange={this.ImageInputHandler}/>
                                                <small
                                                    className='text-danger'>{this.state.inputErrors.featuredImgError}</small>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 text-center'>
                                            <img className="img-thumbnail" width='220'
                                                 src={this.state.featuredImgPreview}
                                                 alt='img'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <div className="form-group">
                                        <label>Content</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={this.state.content}
                                            onChange={this.CKEditorInputHandler}
                                        />
                                        <small
                                            className='text-danger'>{this.state.inputErrors.contentError}</small>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <button type="submit" className="btn btn-primary mr-1">Submit</button>
                                    <Link className='btn btn-secondary' to='/blog'>Cancel</Link>
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
        postCreate: (post) => {
            dispatch(PostCreate(post))
        }
    }
};

export default connect(null, mapDispatchToProps)(Create)