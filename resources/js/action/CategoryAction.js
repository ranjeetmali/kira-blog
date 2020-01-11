export const CategoryList = (categories) => {
    return {type: 'LIST_CATEGORY', payload: categories}
};
export const CategoryCreate = (category) => {
    return {type: 'CREATE_CATEGORY', payload: category}
};
export const CategoryUpdate = (category) => {
    return {type: 'UPDATE_CATEGORY', payload: category}
};
export const CategoryDelete = (category) => {
    return {type: 'DELETE_CATEGORY', payload: category}
};