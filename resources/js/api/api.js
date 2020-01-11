import axios from 'axios'

const baseUrl = "http://localhost/lara-react/public/api";
const getAuthClient = () => {
    let token = localStorage.getItem('token');
    return axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
};

const getClient = () => {
    return axios.create({
        baseURL: baseUrl
    });
};

// Public Route
export const requestLogin = (data) => {
    return getClient().post('/login', data);
};

export const requestRegister = (data) => {
    return getClient().post('/register', data);
};

export const requestGetPublicPosts = () => {
    return getClient().get('/public_posts');
};

export const requestGetPublicPost = (id) => {
    return getClient().get('/public_post/' + id);
};

// Authenticated Route
export const requestGetUser = () => {
    return getAuthClient().get('/user');
};

export const requestUserLogout = () => {
    return getAuthClient().get('/logout');
};

export const requestProfileUpdate = (data) => {
    return getAuthClient().put('/profile/profile-update', data);
};

export const requestProfileUpload = (data) => {
    return getAuthClient().post('/profile/profile-upload', data);
};

export const requestChangePassword = (data) => {
    return getAuthClient().put('/profile/change-password', data);
};

export const requestGetDashboardStatistics = (data) => {
    return getAuthClient().get('/dashboard/statistics', data);
};


export const requestGetCategoryList = () => {
    return getAuthClient().get('/category');
};

export const requestCreateCategory = (data) => {
    return getAuthClient().post('/category', data);
};

export const requestUpdateCategory = (id, data) => {
    return getAuthClient().put('/category/' + id, data);
};

export const requestGetCategory = (id) => {
    return getAuthClient().get('/category/' + id);
};

export const requestDeleteCategory = (id) => {
    return getAuthClient().delete('/category/' + id);
};


export const requestGetPostStatus = () => {
    return getAuthClient().get('/post/status');
};

export const requestGetPostList = () => {
    return getAuthClient().get('/post');
};

export const requestCreatePost = (data) => {
    return getAuthClient().post('/post', data);
};

export const requestUpdatePost = (id, data) => {
    return getAuthClient().post('/post/' + id, data);
};

export const requestGetPost = (id) => {
    return getAuthClient().get('/post/' + id);
};

export const requestDeletePost = (id) => {
    return getAuthClient().delete('/post/' + id);
};