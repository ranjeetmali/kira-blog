const PostReducer = (posts = [], action) => {
    switch (action.type) {
        case "LIST_POST":
            return action.payload;

        case "CREATE_POST" :
            return [...posts, action.payload];

        case "UPDATE_POST" :
            let postIndex = posts.findIndex(data => {
                return data.id = action.payload.id;
            });
            posts[postIndex] = action.payload;
            return posts;

        case "DELETE_POST" :
            return posts.filter((post) => post.id !== action.payload);

        default:
            return posts;
    }
};
export default PostReducer;