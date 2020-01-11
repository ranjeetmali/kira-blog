export const PostList = (posts) => {
    return {type: 'LIST_POST', payload: posts}
};
export const PostCreate = (post) => {
    return {type: 'CREATE_POST', payload: post}
};
export const PostUpdate = (post) => {
    return {type: 'UPDATE_POST', payload: post}
};
export const PostDelete = (post) => {
    return {type: 'DELETE_POST', payload: post}
};