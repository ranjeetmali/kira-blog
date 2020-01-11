const CategoryReducer = (categories = [], action) => {
    switch (action.type) {
        case "LIST_CATEGORY":
            return action.payload;

        case "CREATE_CATEGORY" :
            return [...categories, action.payload];

        case "UPDATE_CATEGORY" :
            let categoryIndex = categories.findIndex(data => {
                return data.id = action.payload.id;
            });
            categories[categoryIndex] = action.payload;
            return categories;

        case "DELETE_CATEGORY" :
            return categories.filter((cat) => cat.id !== action.payload);
        default:
            return categories;
    }
};
export default CategoryReducer;