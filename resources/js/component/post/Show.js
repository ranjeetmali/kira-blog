import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as FaIcon from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {requestGetPost} from "../../api/api";

class Show extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.postId,
            title: "",
            featuredImage: "",
            categoryId: "",
            status: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            featuredImageUrl: "",
            featuredImageThumbUrl: "",
            category: []
        };
    }

    componentDidMount() {
        requestGetPost(this.state.id).then((response) => {
            this.setState({
                title: response.data.title,
                featuredImage: response.data.featured_image,
                categoryId: response.data.category_id,
                status: response.data.status,
                content: response.data.content,
                createdAt: response.data.created_at,
                updatedAt: response.data.updated_at,
                featuredImageUrl: response.data.featured_image_url,
                featuredImageThumbUrl: response.data.featured_image_thumb_url,
                category: {
                    name: response.data.category.name
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return <div className='row'>
            <div className='col-sm-8 mt-4'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            {this.state.title}
                            <div className='float-right'>
                                <Link to='/blog' className='btn btn-dark btn-sm'><FontAwesomeIcon
                                    icon={FaIcon.faArrowLeft}/> Back </Link>
                            </div>
                        </h4>
                    </div>
                    <div className="card-body">
                        {
                            (this.state.featuredImage !== "default.png") ?
                                <img className='img-fluid' src={this.state.featuredImageUrl} alt='img'/> : ""
                        }
                        <div dangerouslySetInnerHTML={{__html: this.state.content}}>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-sm-4 mt-4'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Blog Details
                        </h4>
                    </div>
                    <div className="card-body">
                        <div>Category : {this.state.category.name}</div>
                        <div>Status : {(this.state.status === 'PUBLISH') ?
                            <label className='badge badge-success'>{this.state.status}</label> :
                            <label className='badge badge-secondary'>{this.state.status}</label>}
                        </div>
                        <div>Created At : {this.state.createdAt}</div>
                        <div>Last Update : {this.state.updatedAt}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Show;