import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as FaIcon from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {requestGetDashboardStatistics} from "../api/api";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryCount: "",
            postCount: "",
            recentPosts: []
        };
    }

    componentDidMount() {
        requestGetDashboardStatistics().then(response => {
            let data = response.data;
            this.setState({
                categoryCount: data.category_count,
                postCount: data.post_count,
                recentPosts: data.recent_posts
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return <div className="row mt-4">
            <div className="col-sm-6">
                <div className="dbox dbox--color-1">
                    <div className="dbox__icon">
                        <FontAwesomeIcon icon={FaIcon.faList} size="2x"/>
                    </div>
                    <div className="dbox__body">
                        <span className="dbox__count">{this.state.categoryCount}</span>
                        <span className="dbox__title">Category</span>
                    </div>

                    <div className="dbox__action">
                        <Link to='/category' className="dbox__action__btn">More Info</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="dbox dbox--color-3">
                    <div className="dbox__icon">
                        <FontAwesomeIcon icon={FaIcon.faFileAlt} size="2x" style={{marginLeft: 6}}/>
                    </div>
                    <div className="dbox__body">
                        <span className="dbox__count">{this.state.postCount}</span>
                        <span className="dbox__title">Blog</span>
                    </div>

                    <div className="dbox__action">
                        <Link to='/blog' className="dbox__action__btn">More Info</Link>
                    </div>
                </div>
            </div>
            <div className='col-sm-12'>
                <div className="card">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Recent Blog
                        </h4>
                    </div>
                    <div className="card-body p-0">
                        <table className='table table-bordered mb-0'>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.recentPosts.map((post, index) => {
                                    return <tr key={index}>
                                        <td>{post.title}</td>
                                        <td>{post.category.name}</td>
                                        <td>{post.created_at}</td>
                                        <td>
                                            <Link
                                                to={{pathname: '/blog/' + post.id}}
                                                className='btn btn-secondary btn-sm mr-1'>
                                                Read
                                            </Link>
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

export default Dashboard;