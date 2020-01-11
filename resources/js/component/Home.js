import React, {Component} from "react";
import {Link} from "react-router-dom";
import {requestGetPublicPosts} from "../api/api";
import {connect} from "react-redux";
import {PostList} from "../action/PostAction";

class Home extends Component {

    componentDidMount() {
        requestGetPublicPosts().then((response) => {
            this.props.postList(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return <div className="row">
            {
                this.props.posts.map((post, index) => {
                    return <div className="col-12 col-sm-6 col-md-3 mb-5" key={index}>
                        <div className="card h-100">
                            <img className="card-img-top" src={post.featured_image_thumb_url} alt="img"/>
                            <div className="card-body">
                                <h4 className="card-title">{post.title}</h4>
                                <p className="card-text">
                                    {post.content.replace(/(<([^>]+)>)/ig, "").substr(0, 100) + " ..."}
                                </p>
                            </div>
                            <div className="card-footer">
                                <Link className="btn btn-primary" to={{pathname: '/post/' + post.id + '/public'}}>Read
                                    More</Link>
                            </div>
                        </div>
                    </div>
                })
            }
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);