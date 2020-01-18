import React, {Component} from "react";
// import {Link} from "react-router-dom";
import {requestGetPublicPost} from "../api/api";

class PostView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.postId,
            title: "",
            featuredImage: "",
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
        requestGetPublicPost(this.state.id).then((response) => {
            this.setState({
                title: response.data.title,
                featuredImage: response.data.featured_image,
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
            <div className='col-sm-12 mt-4'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            {this.state.title}
                            <div className='float-right text-muted'>
                                <small style={{fontSize: 13}}>Published On
                                    - {this.state.createdAt} | {this.state.category.name}</small>
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
        </div>
    }
}

export default PostView;
